document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems);
});
onload = () => {
  const deleteBtn = document.querySelector('.delete')
  if(deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      fetch(`/images/${deleteBtn.dataset.id}`, {
        method: 'POST'
      }).then(() => location.href = '/images')
    })
  }
  const createForm = document.querySelector('.form-create')
  if (createForm) {
    createForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const fields = Array.from([...createForm.querySelectorAll('input'), createForm.querySelector('textarea')])
      const emptyField = fields.find(el => el.value.trim() === '')
      if(emptyField) return M.toast({html: `${emptyField.name} field cannot be empty`})
      else createForm.submit()
    })
    createForm.addEventListener('change', () => {
      const author = createForm.querySelector('#author').value
      const description = createForm.querySelector('#description').value
      const photo = createForm.querySelector('#photo').files[0]

      document.querySelector('.preview-author').innerText = author
      document.querySelector('.preview-description').innerText = description
      const reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(document.querySelector('.preview-img'));
      reader.readAsDataURL(photo);
    })
  }
}