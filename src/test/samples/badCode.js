// This file contains intentionally bad code for testing the Code Cringe Detector

// Long function with many issues
function processData(x) {
    // No comments explaining what this does
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    let result = [];
    
    // Magic number
    if (x.length > 42) {
        // Deeply nested conditionals
        for (let i = 0; i < x.length; i++) {
            if (x[i] > 10) {
                if (x[i] < 50) {
                    if (x[i] % 2 === 0) {
                        if (x[i] % 3 === 0) {
                            // Duplicate code block 1
                            a = x[i] * 2;
                            b = x[i] / 2;
                            c = x[i] + 10;
                            d = x[i] - 5;
                            result.push(a + b + c + d);
                        }
                    }
                }
            }
        }
    } else {
        // Duplicate code block 2
        a = x[0] * 2;
        b = x[0] / 2;
        c = x[0] + 10;
        d = x[0] - 5;
        result.push(a + b + c + d);
    }
    
    // More code to make the function longer
    for (let j = 0; j < result.length; j++) {
        result[j] = Math.floor(result[j]);
    }
    
    // Inconsistent variable naming
    let finalResult = 0;
    let FINAL_VALUE = 0;
    let FinalOutput = 0;
    
    // More nested loops
    for (let k = 0; k < result.length; k++) {
        for (let l = 0; l < result.length; l++) {
            if (k !== l) {
                finalResult += result[k] * result[l];
            }
        }
    }
    
    // Complex conditional
    if ((finalResult > 1000 && finalResult < 5000) || (finalResult > 10000 && finalResult % 2 === 0) || (finalResult < 0 && finalResult > -1000) || (finalResult === 42)) {
        FINAL_VALUE = finalResult * 2;
    } else {
        FINAL_VALUE = finalResult / 2;
    }
    
    // Unused variable
    let unusedVar = "This variable is never used";
    
    // Return with no explanation
    return FINAL_VALUE;
}

// Function with vague parameter names
function calc(a, b, c, x, y, z) {
    return (a * x) + (b * y) + (c * z);
}

// Class with inconsistent naming
class dataProcessor {
    constructor() {
        this.ProcessedData = [];
        this.data_source = null;
        this.MAX_SIZE = 100;
    }
    
    // Method that does too many things
    process(input) {
        this.data_source = input;
        this.validate();
        this.transform();
        this.filter();
        this.sort();
        this.aggregate();
        this.format();
        return this.ProcessedData;
    }
    
    validate() {
        // Empty method
    }
    
    transform() {
        // Empty method
    }
    
    filter() {
        // Empty method
    }
    
    sort() {
        // Empty method
    }
    
    aggregate() {
        // Empty method
    }
    
    format() {
        // Empty method
    }
}

// Export without comments
module.exports = {
    processData,
    calc,
    dataProcessor
};
