// Function to calculate the result based on the question
function calculateResult(question) {
    const words = question.split(" ");
    const num1 = parseInt(words[2]);
    const operator = words[3];
    const num2 = parseInt(words[4]);
  
    let result;
  
    switch (operator) {
      case "plus":
        result = num1 + num2;
        break;
      case "minus":
        result = num1 - num2;
        break;
      case "multiplied":
        result = num1 * num2;
        break;
      case "divided":
        result = num1 / num2;
        break;
      default:
        return "Invalid operation";
    }
  
    return `${num1} ${operator} ${num2} is ${result}`;
  }
  
  // Get the question from command-line arguments
  const question = process.argv.slice(2).join(" ");
  
  // Calculate and print the result
  const result = calculateResult(question);
  console.log(result);