package com.github.onsdigital.florence.filter;

import com.github.davidcarboni.restolino.framework.Filter;
import com.github.onsdigital.florence.configuration.Configuration;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;

/**
* Routes all traffic to Tredegar, Unless it is recognised as a florence file being requested.
*/
public class TredegarProxy implements Filter {


    private static final String florenceToken = "/florence";
    private static final String zebedeeToken = "/zebedee";

    private static final String tredegarBaseUrl = Configuration.getTredegarUrl();
    private static final String zebedeeBaseUrl = Configuration.getZebedeeUrl();

    private static final List<String> florencePaths = Arrays.asList("/");

    @Override
    public boolean filter(HttpServletRequest request, HttpServletResponse response) {

        String requestUri = request.getRequestURI();
        String requestQueryString = request.getQueryString() != null ? request.getQueryString() : "";

        try {
            if (florencePaths.contains(requestUri)
                    || requestUri.startsWith(florenceToken)) {
                return true; // carry on and serve the file from florence
            }

            String requestBaseUrl = tredegarBaseUrl; // proxy to tredegar by default.

            if (requestUri.startsWith(zebedeeToken)) {
                requestUri = requestUri.replace(zebedeeToken, "");
                requestBaseUrl = zebedeeBaseUrl;
            }

            CloseableHttpClient httpClient = HttpClients.createDefault();
            HttpGet httpGet = new HttpGet(requestBaseUrl + requestUri + "?" + requestQueryString);

            // copy the request headers.
            Enumeration<String> headerNames = request.getHeaderNames();

            String accessToken = "";

            while (headerNames.hasMoreElements())
            {
                String headerName = headerNames.nextElement();
                httpGet.addHeader(headerName, request.getHeader(headerName));

                if (headerName.equals("access_token"))
                    accessToken = request.getHeader("access_token");
            }

            if (requestBaseUrl == zebedeeBaseUrl && StringUtils.isNotEmpty(accessToken))
            {
                httpGet.addHeader("X-Florence-Token", accessToken);
            }

            CloseableHttpResponse proxyResponse = httpClient.execute(httpGet);

            try {
                HttpEntity responseEntity = proxyResponse.getEntity();

                // copy headers from the response
                for (Header header : proxyResponse.getAllHeaders()) {
                    response.setHeader(header.getName(), header.getValue());
                }

                IOUtils.copy(responseEntity.getContent(), response.getOutputStream());
                EntityUtils.consume(responseEntity);

            } catch (IOException e) {
                return true;
            } finally {
                proxyResponse.close();
            }

        } catch (IOException e) {
            return true;
        }

        return false;
    }
}