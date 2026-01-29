package com.korit.allways_back.config;

import com.siot.IamportRestClient.IamportClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PortOneConfig {
    @Bean
    public IamportClient portOneClient() {
        return new IamportClient("6380032844570346", "Ctqy3veUzplE0m9g8TRWMSRGIy7QbYtbKEppNXSCu1tezGkt3VNG5jQwIpROHmoVejsf2ZNLq1ZjU78d");
    }
}
