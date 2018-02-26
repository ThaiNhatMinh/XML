
function loadData()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            SetPageName(this);
            LoadProduct(this,0);
        }
    };

    xhttp.open("GET", "xml/Du_lieu.xml", true);
    xhttp.send();
}
function loadDataManager()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            SetPageName(this);
            LoadProduct(this,1);
            LoadSumCost(this);
        }
    };

    xhttp.open("GET", "xml/Du_lieu.xml", true);
    xhttp.send();
}
function SetPageName(xml) {
    var xmlDoc = xml.responseXML;

    var name = xmlDoc.getElementsByTagName("Nha_hang")[0].getAttribute("Ten");
    document.getElementById("RestaurantName").innerHTML = name;
   // document.getElementById("RestaurantName").setAttribute("align","center");
    document.getElementById("RestaurantName").style.backgroundColor = "rgba(255, 99, 71, 1.0)";

    var logo = xmlDoc.getElementsByTagName("Nha_hang")[0].getAttribute("Ma_so") + ".png";
    document.getElementById("RestaurantLogo").setAttribute("src","Media\\" + logo);

    document.title = name;

}
function LoadProduct(xml,calCost)
{
    var modal = document.getElementById('myModal');

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
        //TD.style.backgroundColor = 'rgba(60, 179, 113, 0.5)';
        // Create name
        var node = document.createElement("P");
        var name = document.createTextNode(DanhSach[i].getAttribute("Ten") + " (" + DanhSach[i].getAttribute("Don_gia_Ban")+ " D)");
        node.appendChild(name);
        TD.appendChild(node);

        // create image
        node = document.createElement("IMG");
        node.setAttribute("src","Media\\" + DanhSach[i].getAttribute("Ma_so") + ".png");
        node.setAttribute("height",128);
        node.setAttribute("width",128);
        TD.setAttribute("align","center");
        TD.appendChild(node);

        if(calCost==1)
        {
            var func = "ShowModal(\"" + DanhSach[i].getAttribute("Ten") + "\",\"" +DanhSach[i].getAttribute("Don_gia_Ban") + "\")";
            TD.setAttribute("onClick",func);
        }
        TR.appendChild(TD);

        current +=1;
        if(current==4)
        {
            table.appendChild(TR);
            TR = document.createElement("TR");
            current = 0;
        }
    }

    document.getElementById("ProductLists").appendChild(table);
    //document.getElementById("Product").setAttribute("float","none");
    //document.body.appendChild(table);
    
}

function LoadSumCost(xml)
{
    var sumConst = 0;

    var xmlDoc = xml.responseXML;
    var listProduct = xmlDoc.getElementsByTagName("Danh_sach_Mat_hang")[0];
    var DanhSach = listProduct.getElementsByTagName("Mat_hang");
    var num = DanhSach.length;

    for(i=0; i<num; i++)
    {
        var DanhsachBan = DanhSach[i].getElementsByTagName("Danh_sach_Ban_hang")[0];
        var BanHang = DanhsachBan.getElementsByTagName("Ban_hang");
        var numBan = BanHang.length;

        for(j=0; j<numBan; j++)
            sumConst += parseInt(BanHang[j].getAttribute("Tien"));
    }

    document.getElementById("SumCost").innerHTML = "Danh thu: " + sumConst + " VND" ;
    document.getElementById("SumCost").setAttribute("align","center");
}