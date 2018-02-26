// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("TotalCost").style.display = "none";
    }
}
var CurrentName = "Unknow";
var CurrentCost = 0;
function ShowModal(name,cost)
{
    document.getElementById("TinhTienTitle").innerHTML = "Tính tiền: " + name;
    document.getElementById("Gia").innerHTML = "Giá: " +cost;
    modal.style.display = "block";

    CurrentCost = parseInt(cost);
    CurrentName = name;
}
function HideModal()
{
    modal.style.display = "none";
    document.getElementById("TotalCost").style.display = "none";
}

function CalTotalCost()
{
    if(document.getElementById("number").value<1)
    {
        document.getElementById("TotalCost").innerHTML = "Số lượng không hợp lệ!";
        document.getElementById("TotalCost").style.display = "block";
        return;
    }
    var sum = CurrentCost * parseInt(document.getElementById("number").value);
    document.getElementById("TotalCost").innerHTML = "Thành tiền: " + sum;
    document.getElementById("TotalCost").style.display = "block";
}