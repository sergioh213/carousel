(function () {
  var kitties = document.getElementsByClassName('kitty');
  var dots = document.getElementsByClassName('dot');
  var img = document.getElementById('kitties');
  var timer;
  var isTransitioning;
  var current = 0;
  var startX;
  var startY;
  var finishX;
  var finishY;

  function moveKitties(next) {
    dots[current].classList.remove('active');
    kitties[current].classList.remove('onscreen');
    isTransitioning = true;
    // console.log('The leaving one is ' + current);
    kitties[current].classList.add('exit');

    if (typeof next != 'undefined'){
      current = next;
    } else {
      current++;
    }
    if (current >= kitties.length){
      current = 0;
    }
    dots[current].classList.add('active');
    // console.log('The one coming on screen is ' + current);
    kitties[current].classList.add('onscreen');
  }

  document.addEventListener('transitionend', function(e){
    if (e.target.classList.contains('exit')){
      e.target.classList.remove('exit');
      isTransitioning = false;
      timer = setTimeout(moveKitties, 2000);
    }
  })

  for (var i = 0; i < dots.length; i++){
    dots[i].addEventListener('click', eventHandler(i));
  }

  function eventHandler(n){
    return function(e){
      if (e.target.classList.contains('active')){
        return;
      };
      if (isTransitioning){
        return;
      }
      clearTimeout(timer);
      console.log(n)
      moveKitties(n)
    }
  }

  document.addEventListener("touchstart", function(e) {
      console.log("touchstart");
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
  });
  document.addEventListener("touchend", function(e) {
      console.log("touchend");
      finishX = e.changedTouches[0].pageX;
      finishY = e.changedTouches[0].pageY;
      console.log(finishX);
      if (finishX < startX) {
          if (isTransitioning == false) {
            moveKitties();
          }
      }
      clearTimeout(timer);
  });
  // for (var i = 0; i < dots.length; i++){
  //   dots[i].addEventListener('mouseover', mouseoverhandler(i))
  //   dots[i].addEventListener('mouseout', mouseouthandler(i))
  // }
  //
  // function mouseoverhandler(n){
  //   return function(n){
  //       n.style.backgroundColor = 'grey';
  //       n.style.cursor= 'pointer';
  //     }
  //   }
  // function mouseouthandler(n){
  //   return function(n){
  //     n.style.backgroundColor = '';
  //     n.style.cursor= '';
  //   }
  // }

  timer = setTimeout(moveKitties, 2000)

}())
