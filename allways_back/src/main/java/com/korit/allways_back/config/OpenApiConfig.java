package com.korit.allways_back.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPIConfig() {
        OpenAPI openAPI = new OpenAPI();

        Info info = new Info();
        info.title("allways project swagger");
        info.version("1.0");
        info.description("기능 시험중");

//        SecurityRequirement securityRequirement = new SecurityRequirement();
//        securityRequirement.addList("Bearer Authentication");
//
//        SecurityScheme securityScheme = new SecurityScheme();
//        securityScheme.name("Bearer Authentication");
//        securityScheme.type(SecurityScheme.Type.HTTP);
//        securityScheme.scheme("bearer");
//        securityScheme.bearerFormat("JWT");
//
//        Components components = new Components();
//        components.addSecuritySchemes("Bearer Authentication", securityScheme);

        return openAPI
                .info(info);
//                .addSecurityItem(securityRequirement)
//                .components(components);
    }

}