package com.donbala;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@MapperScan("com.donbala.*.dao")
//@ServletComponentScan
//@EnableTransactionManagement
public class CrmWebApplication {

    public static void main(String[] args) {
        System.out.println("programming launching");
        SpringApplication.run(CrmWebApplication.class, args);
    }

}