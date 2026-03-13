package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {
    @Autowired
    private AiService aiService; // Bring the messenger into the room

    // This creates a new URL: /api/expenses/categorize?description=Netflix
    @GetMapping("/categorize")
    public String autoCategorize(@RequestParam String description) {

        // The Controller takes the word from the browser, hands it to the Messenger, and sends the answer back!
        return aiService.guessCategory(description);
    }

    @Autowired
    private ExpenseRepository repository;

    @GetMapping
    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return repository.save(expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        repository.deleteById(id);
    }
}