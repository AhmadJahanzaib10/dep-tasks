document.addEventListener("DOMContentLoaded", function() {

    const editButtons = document.querySelectorAll('.editBtn');
    const deleteButtons = document.querySelectorAll('.delBtn');
    
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tr = this.closest('tr');
        const productId = tr.querySelector('th[data-id]').getAttribute('data-id');
        const productName = tr.querySelector('td[data-name]').getAttribute('data-name');
        const productDescription = tr.querySelector('td[data-description]').getAttribute('data-description');

        console.log(productDescription, productName)
        // Populate the modal with the existing data
        document.getElementById('editProductId').value = productId;
        document.getElementById('editProductName').value = productName;
        document.getElementById('editProductDescription').value = productDescription;
      });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const productId = this.getAttribute('data-id');
            
            try {
                const response = await fetch(`/deleteProduct/${productId}`, {
                    method: 'DELETE'
                });
                const data = await response.json();

                if (data.success) {
                    // Remove the product row from the table
                    this.closest('tr').remove();
                } else {
                    alert('Failed to delete the product');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});

document.getElementById("saveEditBtn").addEventListener("click", async ()=>{
    const productId = document.getElementById('editProductId').value;
    const productName = document.getElementById('editProductName').value;
    const productDescription = document.getElementById('editProductDescription').value;

    try {
        const response = await fetch(`/updateProduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: productName, description: productDescription })
        });

        const data = await response.json();

        if (data.success) {
            // Update the table row with the new values
            // const row = document.querySelector(`th[data-id="${productId}"]`).closest('tr');
            // row.querySelector('td[data-name]').setAttribute('data-name', productName);
            // row.querySelector('td[data-description]').setAttribute('data-description', productDescription);
            // row.querySelector('td[data-name]').innerText = productName;
            // row.querySelector('td[data-description]').innerText = productDescription;

            // // Hide the modal
            // const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            // editModal.hide();
            location.reload();
        } else {
            alert('Failed to update the product');
        }
    } catch (error) {
        console.error('Error:', error);
    }
})