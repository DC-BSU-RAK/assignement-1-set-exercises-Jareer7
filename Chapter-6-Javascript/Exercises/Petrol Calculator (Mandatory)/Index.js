// Calculate total cost of petrol
function calculateTotal() {
    const costPerLitre = parseFloat(document.getElementById('cost').value);
    const litres = parseFloat(document.getElementById('litres').value);
    const total = costPerLitre * litres;
  
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: £${total.toFixed(2)}`;
  }
  