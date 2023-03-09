// 创建表格
var popup = L.popup();
    map.on('click', onMapClick);
    //var table = document.createElement('table');
    // table.setAttribute("border", "1");

// 创建表头行
/*    var table = getElementById("table")
    var headerRow = table.insertRow();
    headerRow.setAttribute("align", "center");

    var headerCell1 = headerRow.insertCell();
    var headerCell2 = headerRow.insertCell();
    var headerCell3 = headerRow.insertCell();
    var headerCell4 = headerRow.insertCell();
    var headerCell5 = headerRow.insertCell();
    var headerCell6 = headerRow.insertCell();

    headerCell1.innerHTML = 'Laititude';
    headerCell2.innerHTML = 'Longtitude';
    headerCell3.innerHTML = 'Commentaire';
    headerCell6.innerHTML = 'URL image'

    headerCell1.setAttribute("width", "150");
    headerCell2.setAttribute("width", "150");
    headerCell3.setAttribute("width", "300");
    headerCell4.setAttribute("width", "150");
    headerCell5.setAttribute("width", "150");
    headerCell6.setAttribute("width", "300");


// 创建数据行
    var dataRow1 = table.insertRow();
    dataRow1.setAttribute("align", "center");

    var dataCell1 = dataRow1.insertCell();
    var dataCell2 = dataRow1.insertCell();
    var dataCell3 = dataRow1.insertCell();
    var dataCell4 = dataRow1.insertCell();
    var dataCell5 = dataRow1.insertCell();
    var dataCell6 = dataRow1.insertCell();

    dataCell1.setAttribute("width", "150");
    dataCell2.setAttribute("width", "150");
    dataCell3.setAttribute("width", "300");
    dataCell4.setAttribute("width", "150");
    dataCell5.setAttribute("width", "150");
    dataCell6.setAttribute("width", "300");

    dataCell1.innerHTML = '<input type="text" placeholder="Laititude" id="laititude">';
    dataCell2.innerHTML = '<input type="text" placeholder="Longtitude" id="longtitude">';
    dataCell3.innerHTML = '<input type="text" placeholder="Commentaire" style="width:300px;" id="commentaire">';
    dataCell4.innerHTML = '<button onclick="fct_sauvegarder()">Sauvegarder</button>';
    dataCell5.innerHTML = '<button onclick="fct_abandonner()">Abandonner</button>';
    dataCell6.innerHTML = '<input type="text" placeholder="URL image" style="width:300px;" id="url">';
*/
//pivot pour numeroter les id
    var res_tot = 1;
    

// 将表格插入到页面中的指定位置
   // var container = document.getElementById('table-container');
    //container.appendChild(table); 

//保存新的point préféré 
    function fct_sauvegarder(){
        var table = document.getElementById('table');

    //定义新的id
        var id_laititude = "laititude" + res_tot.toString();
        var id_longtitude = "longtitude" + res_tot.toString(); 
        var id_commentaire = "commentaire" + res_tot.toString();
        var id_visualiser = "visualiser" + res_tot.toString();
        var id_url = "url" + res_tot.toString();
        
    //插入新的一行表格
       console.log(table);
        var dataRow2 = table.insertRow(-1);
        //dataRow2.setAttribute("align", "center");
        //dataRow2.setAttribute("id", res_tot.toString());

        var dataCell1 = dataRow2.insertCell(0);
        var dataCell2 = dataRow2.insertCell(1);
        var dataCell3 = dataRow2.insertCell(2);
        var dataCell4 = dataRow2.insertCell(3);
        var dataCell5 = dataRow2.insertCell(4);
        var dataCell6 = dataRow2.insertCell(5);

        /*dataCell1.setAttribute("width", "150");
        dataCell2.setAttribute("width", "150");
        dataCell3.setAttribute("width", "300");
        dataCell4.setAttribute("width", "150");
        dataCell5.setAttribute("width", "150");
        dataCell6.setAttribute("width", "300");*/

        var lait = document.getElementById('laititude').value;
        var long = document.getElementById('longtitude').value;
        var com = document.getElementById('commentaire').value;
        var url = document.getElementById('url').value;

    //输入新的数值
        dataCell1.innerHTML = lait;
        dataCell2.innerHTML = long;
        dataCell3.innerHTML = com;
        dataCell4.innerHTML = '<button onclick="fct_visualiser(this)">Revenir</button>';

    //给每个单元格设定id
        dataCell1.setAttribute("id", id_laititude);
        dataCell2.setAttribute("id", id_longtitude);
        dataCell3.setAttribute("id", id_commentaire);
        var button = dataCell4.querySelector("button");
        button.setAttribute("id", id_visualiser);
        dataCell6.setAttribute("id", id_url);

    //把url单元格字设置成白色，文字不可见
        //document.getElementById(id_url).style.color = "white";

    //插入新的marker
        var marker = L.marker([lait, long]).addTo(map);
        marker.id = url;
        marker.bindPopup(com);
        
        var imageUrl = "F:\ilog\565382.jpg";  // 图片的URL地址
        var imageHtml = "<img src='" + imageUrl + "' />";  // 将图片URL放入<img>标签中
        var popup = L.popup().setContent(imageHtml);  // 使用HTML代码作为popup的内容
        marker.bindPopup(popup);
    
        // marker.on('click', function(e) {
        //     if (marker.getPopup().isOpen()) {
        //       marker.openPopup();
        //     } else {
        //       marker.closePopup();
        //     }
        //     // var markerId = e.target.options.id;  // 获取id值
        //     //   window.open(markerId); 
        //   });

    //liberer la commentaire/url
        document.getElementById("commentaire").value = '';
        document.getElementById("url").value = '';
    
    //res_tot自增
        res_tot ++;
    }

//Abandonner
    function fct_abandonner(){
        document.getElementById("laititude").value = '';
        document.getElementById("longtitude").value = '';
        document.getElementById("commentaire").value = '';
    }

//点击获取经纬度数据
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);

        // setTimeout(function() {
        //     map.closePopup(popup);
        // }, 1500);

        var lait_longti = e.latlng.toString().substring(7);
        let array_separe = lait_longti.split(",");
        var laititude_map = array_separe[0];
        var longtitude_map = array_separe[1].substring(0, array_separe[1].length - 1);

        document.getElementById("laititude").value = laititude_map;
        document.getElementById("longtitude").value = longtitude_map;
    }
    var popup = L.popup();
    map.on('click', onMapClick);

//跳转到指定地点
    function jump(lai, lon){
        var latlng = L.latLng(lai, lon);
        map.panTo(latlng);
    }

//visualisation
    function fct_visualiser(btn){
        var pivot = btn.id.charAt(btn.id.length - 1);//地点编号找到
        var lai_id = "laititude" + pivot.toString();
        var long_id = "longtitude" + pivot.toString();//根据地点编号找到经纬度id
        var lai = document.getElementById(lai_id).innerHTML;
        var long = document.getElementById(long_id).innerHTML;
        jump(lai, long);
    }
    