
function loadData()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            SetPageName(this);
            LoadProduct(this);
        }
    };

    xhttp.open("GET", "xml/Du_lieu.xml", true);
    xhttp.send();
}

function SetPageName(xml) {
    var xmlDoc = xml.responseXML;

    var name = xmlDoc.getElementsByTagName("Nha_hang")[0].getAttribute("Ten");
    document.getElementById("RestaurantName").innerHTML = name;
    document.getElementById("RestaurantName").setAttribute("align","center");
    document.getElementById("RestaurantName").style.backgroundColor = "rgba(255, 99, 71, 1.0)";
    document.title = name;

}
function LoadProduct(xml)
{
    var xmlDoc = xml.responseXML;
    var listProduct = xmlDoc.getElementsByTagName("Danh_sach_Mat_hang")[0];
    var DanhSach = listProduct.getElementsByTagName("Mat_hang");
    var num = DanhSach.length;

    var table = document.createElement("TABLE");
    table.setAttribute("align","center");
    var TR = document.createElement("TR");
    var current = 0;
    for(i=0; i<num; i++)
    {
        // create node for table
        var TD = document.createElement("TD");
        TD.style.backgroundColor = 'rgba(60, 179, 113, 0.5)';
        // Create name
        var node = document.createElement("P");
        var name = document.createTextNode(DanhSach[i].getAttribute("Ten") + " (" + DanhSach[i].getAttribute("Don_gia_Ban")+ " D)");
        node.appendChild(name);
        //document.body.appendChild(node);
        TD.appendChild(node);

        // create image
        node = document.createElement("IMG");
        node.setAttribute("src","Media\\" + DanhSach[i].getAttribute("Ma_so") + ".png");
        node.setAttribute("height",128);
        node.setAttribute("width",128);
        TD.setAttribute("align","center");
        //document.body.appendChild(node);
        TD.appendChild(node);

        TR.appendChild(TD);

        current +=1;
        if(current==4)
        {
            table.appendChild(TR);
            TR = document.createElement("TR");
            current = 0;
        }
    }

    document.body.appendChild(table);
    
}