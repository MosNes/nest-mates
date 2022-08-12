async function complete(event) {
   if  (event.target.dataset.button === "complete-btn"){
      const id = event.target.id.split("-")[2]
      console.log(id)
      
   }


}





// const input = document.createElement("input");
//     input.setAttribute("type", "text");
//     document.body.appendChild(input);

//     tasks.push(taskInput);

  
//   saveTasks();



    
// function add() {
//     var new_chq_no = parseInt($('#total_chq').val()) + 1;
//     var new_input = "<input type='text' id='new_" + new_chq_no + "'>";
//     $('#new_chq').html(new_input);
//   }
  
//   function remove() {
//     var last_chq_no = $('#total_chq').val();
//     if (last_chq_no > 1) {
//       $('#new_' + last_chq_no).append('');
//       $('#total_chq').val(last_chq_no - 1);
//     }
//   }

document.getElementById("mynest-cards").addEventListener("click", complete);