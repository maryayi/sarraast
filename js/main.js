$(function() {
  $.getJSON("./sarraast.json", function(json) {


    // Make Addresses Unordered Lists
    function bulletMaker(ii, arr) {
      var tmpStr = '';
      for (var jj = 1; jj <= arr[ii - 1].address.length; jj++) {
        tmpStr += '<li class="bullet">' + arr[ii - 1].address[jj-1] + '</li>'
      }
      return tmpStr;
    }

    var mainArr = json.sarraast;
    var resultArr1 = mainArr;
    var cityArr = [];
    for (var ii = 1; ii <= mainArr.length; ii++) {
      $('.table').append('<tr><td>' + ii + '</td><td>' + mainArr[ii - 1].city + '</td><td>' + mainArr[ii - 1].business + '</td><td><ul>' + bulletMaker(ii,mainArr) + '</ul></td></tr>');
      cityArr.push(mainArr[ii - 1].city);
    }
    var cityArrUnq = [];
    $.each(cityArr, function(i, el) {
      if ($.inArray(el, cityArrUnq) === -1)
        cityArrUnq.push(el);
      }
    );
    // console.log(cityArrUnq);
    for (var ii=1; ii <= cityArrUnq.length; ii++) {
        $('select.citySel').append('<option value="' + cityArrUnq[ii - 1] + '">' + cityArrUnq[ii - 1] + '</option>');
    }

    $('select.citySel').on('change', function() {
      // alert('you selected ' + $('select.citySel').val());
      if ($('select.citySel').val() !== '0') {
        resultArr1 = mainArr.filter(function(item){
            return item.city === $('select.citySel').val();
        });
      } else {
        resultArr1 = mainArr;
      }

      $('.table').html('<colgroup><col span="1" style="width: 5%;"><col span="1" style="width: 10%;"><col span="1" style="width: 20%;"><col span="1" style="width: 65%;"></colgroup><tr><th>ردیف</th><th>شهر</th><th>نام صنف</th><th>آدرس</th></tr>');
      for (var ii = 1; ii <= resultArr1.length; ii++) {
        $('.table').append('<tr><td>' + ii + '</td><td>' + resultArr1[ii - 1].city + '</td><td>' + resultArr1[ii - 1].business + '</td><td><ul>' + bulletMaker(ii,resultArr1) + '</ul></td></tr>');
      }

      $('.search').val('');
    });

    $(".search").on('input', function() {
      var squery = $('.search').val();
      // console.log(squery);
      resultArr = resultArr1.filter(function(item) {
        // console.log(item.business.includes(squery));
        return item.business.includes(squery);
      })

      function highlightSearch(str, query) {
        var pattern = new RegExp(query,'i');
        var matchObj = pattern.exec(str);
        return str.substring(0,matchObj.index) + '<span class="highlightTxt">' + str.substring(matchObj.index ,matchObj.index +  query.length) + '</span>' + str.substring(matchObj.index +  query.length, str.length);
      }

      $('.table').html('<colgroup><col span="1" style="width: 5%;"><col span="1" style="width: 10%;"><col span="1" style="width: 20%;"><col span="1" style="width: 65%;"></colgroup><tr><th>ردیف</th><th>شهر</th><th>نام صنف</th><th>آدرس</th></tr>');
      for (var ii = 1; ii <= resultArr.length; ii++) {
        $('.table').append('<tr><td>' + ii + '</td><td>' + resultArr[ii - 1].city + '</td><td>' + highlightSearch(resultArr[ii - 1].business, squery) + '</td><td><ul>' + bulletMaker(ii,resultArr) + '</ul></td></tr>');
      }
    });
  });
})
