package main

import (
	"github.com/ONSdigital/go-ns/handlers/requestID"
	"github.com/ONSdigital/go-ns/handlers/timeout"
	"github.com/ONSdigital/go-ns/log"
	"github.com/gorilla/pat"
	"github.com/justinas/alice"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"time"
	"strings"
)

var BindAddr = ":8081"
var BabbageURL = "http://localhost:8080"
var ZebedeeURL = "http://localhost:8082"

func main() {

	if v := os.Getenv("BIND_ADDR"); len(v) > 0 {
		BindAddr = v
	}
	if v := os.Getenv("BABBAGE_URL"); len(v) > 0 {
		BabbageURL = v
	}
	if v := os.Getenv("ZEBEDEE_URL"); len(v) > 0 {
		ZebedeeURL = v
	}

	log.Namespace = "florence"

	router := pat.New()
	alice := alice.New(
		timeout.Handler(10*time.Second),
		log.Handler,
		requestID.Handler(16),
	).Then(router)

	babbageURL, err := url.Parse(BabbageURL)
	if err != nil {
		log.Error(err, nil)
		os.Exit(1)
	}

	babbageProxy := createReverseProxy(babbageURL)

	zebedeeURL, err := url.Parse(ZebedeeURL)
	if err != nil {
		log.Error(err, nil)
		os.Exit(1)
	}

	zebedeeProxy := createZebedeeReverseProxy(zebedeeURL)

	router.Handle("/zebedee/{uri:.*}", zebedeeProxy)
	router.Handle("/{uri:.*}", babbageProxy)

	log.Debug("Starting server", log.Data{
		"bind_addr":   BindAddr,
		"babbage_url": BabbageURL,
		"zebedee_url": ZebedeeURL,
	})

	server := &http.Server{
		Addr:         BindAddr,
		Handler:      alice,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	if err := server.ListenAndServe(); err != nil {
		log.Error(err, nil)
		os.Exit(2)
	}
}

func createReverseProxy(proxyURL *url.URL) http.Handler {
	proxy := httputil.NewSingleHostReverseProxy(proxyURL)
	director := proxy.Director
	proxy.Transport = &http.Transport{
		Proxy: http.ProxyFromEnvironment,
		DialContext: (&net.Dialer{
			Timeout:   5 * time.Second,
			KeepAlive: 30 * time.Second,
		}).DialContext,
		MaxIdleConns:          100,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   5 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
	}
	proxy.Director = func(req *http.Request) {
		director(req)
		req.Host = proxyURL.Host
	}
	return proxy
}

func createZebedeeReverseProxy(proxyURL *url.URL) http.Handler {
	proxy := httputil.NewSingleHostReverseProxy(proxyURL)
	director := proxy.Director
	proxy.Transport = &http.Transport{
		Proxy: http.ProxyFromEnvironment,
		DialContext: (&net.Dialer{
			Timeout:   5 * time.Second,
			KeepAlive: 30 * time.Second,
		}).DialContext,
		MaxIdleConns:          100,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   5 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
	}
	proxy.Director = func(req *http.Request) {
		if c, err := req.Cookie(`access_token`); err == nil && len(c.Value) > 0 {
			req.Header.Set(`X-Florence-Token`, c.Value)
		}

		director(req)
		req.Host = proxyURL.Host
		req.URL.Path = strings.TrimPrefix(req.URL.Path, "/zebedee")
	}
	return proxy
}
