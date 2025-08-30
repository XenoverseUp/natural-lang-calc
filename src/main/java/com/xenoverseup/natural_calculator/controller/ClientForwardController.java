package com.xenoverseup.natural_calculator.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ClientForwardController {

    @RequestMapping("/")
    public String reactApp() {
        return "forward:/index.html";
    }

    @RequestMapping("/**/{path:[^\\.]*}")
    public String notFound(@PathVariable String path) {
        return "forward:/404.html";
    }

}
