(function ($) {
  $(".transVI").click(function(){
      //chuyen tat ca vao sumTrans
      var arrTrans = [];
      $(".translate").each(function() {
          arrTrans.push($(this).text().trim());
      });

      stringTrans = arrTrans.join(",");
      console.log("stringTrans:", stringTrans);
      const translate = require("translate");
      const bar = translate(stringTrans, { from: 'en', to: 'vi', engine: 'google', key: 'AIzaSyA9oA2ivdWXD9aMEGdKLMIPFv3A_Vff2Ms' })
      .then(result => {
          console.log("GET TRANSLATE!");
          console.log("result:", result);
          const arr = result.split(",");
          console.log("arr", arr);

          $(".translate").each(function(index) {
              console.log(arr[index]);
              $(".translate")[index].innerHTML = arr[index];
          });
      });
  })
  $(".transEN").click(function(){
    //chuyen tat ca vao sumTrans
    var arrTrans = [];
    $(".translate").each(function() {
        arrTrans.push($(this).text().trim());
    });

    stringTrans = arrTrans.join(",");
    console.log("stringTrans:", stringTrans);
    const translate = require("translate");
    const bar = translate(stringTrans, { from: 'vi', to: 'en', engine: 'google', key: 'AIzaSyA9oA2ivdWXD9aMEGdKLMIPFv3A_Vff2Ms' })
    .then(result => {
        console.log("GET TRANSLATE!");
        console.log("result:", result);
        const arr = result.split(",");
        console.log("arr", arr);

        $(".translate").each(function(index) {
            console.log(arr[index]);
            $(".translate")[index].innerHTML = arr[index];
        });
    });
  })
})(jQuery);