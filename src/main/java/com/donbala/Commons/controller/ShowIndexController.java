package com.donbala.Commons.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ShowIndexController {

    @GetMapping("/")
    public ModelAndView showIndex(ModelAndView mv) {

        mv.setViewName("system/userlogin");
        return mv;
     }

}
