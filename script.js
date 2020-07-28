 $(document).ready(function() {
     clearLocal()
     getData();
     changeQty()

     $('.addTocart').click(function() {
         var id = $(this).data('id');
         var photo = $(this).data('photo');
         var name = $(this).data('name');
         var price = $(this).data('price');
         // alert(`${id} ${photo} ${name} ${price}`);

         var items = {
             id: id,
             photo: photo,
             name: name,
             price: price,
             qty: 1
         };
         // console.log("item", item)
         var newArray;
         var localItem = localStorage.getItem('newitem');
         if (localItem == null) {
             var newArray = Array();
         } else {
             newArray = JSON.parse(localItem);
         }
         // console.log("localItem", localItem);
         var exit;
         if (newArray.length > 0) {
             $.each(newArray, function(i, v) {
                 if (id == v.id) {
                     v.qty++;
                     exit = 1;
                 }
             })
             if (!exit) {
                 newArray.push(items);
             }

         } else {
             newArray.push(items);
         }


         localStorage.setItem('newitem', JSON.stringify(newArray));
         // console.log("newArray", newArray)
         getData();
         changeQty()
         clearLocal()
     })

     function getData() {
         var localItem = localStorage.getItem('newitem');
         var html = "";
         var total = 0;
         if (localItem != null) {
             newArray = JSON.parse(localItem);
             $.each(newArray, function(i, v) {
                 var subtotal = v.qty * v.price;
                 total += subtotal;
                 html += `<tr>
                                <td rowspan="3"><img src="${v.photo}" width = '70px'></td>
                                <td>${v.name}</td>
                                <td><input type="number" value="${v.qty}" class="qty" min=1 data-id="${i}"></td>
                            </tr>
                            <tr>
                                <td>${v.price}</td>
                            </tr>
                            <tr>
                                <td class="remove" data-id="${i}">remove</td>
                            </tr>`
             })
             html += `<tr>
                            <td colspan = "3"> Total: $${total}</td>
                           </tr>
                           <tr>
                            <td colspan = "3"><button class="btn" id="clearcart">CLEAR CART<button></td>
                           </tr>`
             $('#result').html(html);
         } else {
             var status = `<tr><th colspan="6">Please Secect Items First</th></tr> `
             $('#result').html(status);
         }
         clearLocal()
     }

     // remove
     $('#result').on('click', '.remove', function() {
         var id = $(this).data('id');
         var localItem = localStorage.getItem('newitem');
         var newArray = JSON.parse(localItem);
         newArray.splice(id, 1);
         localStorage.setItem('newitem', JSON.stringify(newArray));
         getData()
         clearLocal()
     })
     // chang qty
     $('#result').on('change', '.qty', function() {
         var id = $(this).data('id');
         var qty = $(this).val();
         var localItem = localStorage.getItem('newitem');
         var newArray = JSON.parse(localItem);
         newArray[id].qty = qty;

         if (qty == 0) {
             newArray.splice(id, 1);
         }
         localStorage.setItem('newitem', JSON.stringify(newArray));
         getData();
         clearLocal();
     })

     function changeQty() {
         var localItem = localStorage.getItem('newitem');
         if (localItem) {
             var newArray = JSON.parse(localItem);
             var count = newArray.length;
             $('#notiqty').html(count);
         }
         getData();
         clearLocal();
     }

     function clearLocal() {
         $('#clearcart').click(function() {
             localStorage.removeItem('newitem');
             getData();
             changeQty();
         })
     }

 })