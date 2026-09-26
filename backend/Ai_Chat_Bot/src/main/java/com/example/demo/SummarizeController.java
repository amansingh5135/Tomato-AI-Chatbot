package com.example.demo;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class SummarizeController {

    private SummarizeService summarizeService;

    public SummarizeController(SummarizeService summarizeService){
        this.summarizeService = summarizeService;
    }

    @PostMapping("/chat")
    public String summarize(@RequestBody String message){
        return summarizeService.chat(message);
    }
}
