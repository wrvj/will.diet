var showNewItem = false;
document.getElementById("addNewItemDialog").onclick = () => {
  console.log(showNewItem);
  if (showNewItem == false) {
    showNewItem = true;
    document.getElementById("addItemDialog").classList.remove('add-item-dialog-collapsed');
  } else {
    showNewItem = false;
    document.getElementById("addItemDialog").classList.add('add-item-dialog-collapsed');
  }
}
