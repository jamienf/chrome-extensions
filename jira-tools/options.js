document.addEventListener('DOMContentLoaded', function() {
  var subdomainInput = document.getElementById('subdomainInput');
  var saveSubdomainButton = document.getElementById('saveSubdomainButton');

  saveSubdomainButton.addEventListener('click', function() {
    var newSubdomain = subdomainInput.value.trim();
    if (newSubdomain !== '') {
      localStorage.setItem('subdomain', newSubdomain);
      alert('Subdomain saved successfully!');
    } else {
      alert('Please enter a subdomain.');
    }
  });
});

