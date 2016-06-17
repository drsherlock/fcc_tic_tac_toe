var cells = {
  topleft: "",
  topmid: "",
  topright: "",
  midleft: "",
  midmid: "",
  midright: "",
  bottleft: "",
  bottmid: "",
  bottright: ""
};
var turn = "bot";
var totalMoves = 0;
var result = "";
var userSide = "";
var botSide = "";

$(document).ready(function() {
  setTimeout(function() {
    chooseXO();
  }, 1000);
});

$('.cell').on('click', function() {
  var choice = $(this).attr('id');
  if (cells[choice] === "" && totalMoves < 9) {
    totalMoves++;
    makeMove(choice);
    botMove();
  }
});

function chooseXO(x, y, z) {
  if (result === "botWon") {
    html = '<div id="XO"><p id="result">YOU LOST</p>CHOOSE YOUR SIDE<br><button id="X">X</button><button id="O">O</button></div>';
  } else if (result === "tied") {
    html = '<div id="XO"><p id="result">GAME TIED</p>CHOOSE YOUR SIDE<br><button id="X">X</button><button id="O">O</button></div>';
  } else {
    html = '<div id="XO"><p id="result">LETS PLAY</p>CHOOSE YOUR SIDE<br><button id="X">X</button><button id="O">O</button></div>';
  }
  $(html).hide().appendTo('#choose').slideDown("slow");

  $("#X").click(function() {
    $('#' + x).css("background", "rgba(138, 56, 52, 0.6)");
    $('#' + y).css("background", "rgba(138, 56, 52, 0.6)");
    $('#' + z).css("background", "rgba(138, 56, 52, 0.6)");
    $('#XO').slideUp("slow", function() {
      $('#XO').remove();
    });
    userSide = "x";
    botSide = "o";
    newGame();
  });

  $("#O").click(function() {
    $('#' + x).css("background", "rgba(138, 56, 52, 0.7)");
    $('#' + y).css("background", "rgba(138, 56, 52, 0.7)");
    $('#' + z).css("background", "rgba(138, 56, 52, 0.7)");
    $('#XO').slideUp("slow", function() {
      $('#XO').remove();
    });
    userSide = "o";
    botSide = "x";
    newGame();
  });
}

function makeMove(choice) {
  var cell = '#' + choice;
  if (turn === "bot") {
    cells[choice] = botSide;
    $('<p>' + botSide + '</p>').appendTo(cell);
    turn = "human";
  } else {
    cells[choice] = userSide;
    $('<p>' + userSide + '</p>').appendTo(cell);
    turn = "bot";
  }
}

function newGame() {
  cells = {
    topleft: "",
    topmid: "",
    topright: "",
    midleft: "",
    midmid: "",
    midright: "",
    bottleft: "",
    bottmid: "",
    bottright: ""
  };
  turn = "bot";
  totalMoves = 0;
  result = "";
  for (var cell in cells) {
    cell = '#' + cell;
    $(cell).empty();
  }
  $('.cell').css("pointer-events", "auto");
  botMove();
}

function showWin(x, y, z) {
  $('.cell').css("pointer-events", "none");
  $('#' + x).animate({
    backgroundColor: "#c32a17"
  }, 'slow');
  $('#' + y).animate({
    backgroundColor: "#c32a17"
  }, 'slow');
  $('#' + z).animate({
    backgroundColor: "#c32a17"
  }, 'slow');

  setTimeout(function() {
    chooseXO(x, y, z);
  }, 1000);
}

function botMove() {
  //first move
  if (totalMoves === 0) {
    var x = Math.floor((Math.random() * 3));
    var y = Math.floor((Math.random() * 3));
    var choices = [
      ["topleft", "topmid", "topright"],
      ["midleft", "midmid", "midright"],
      ["bottleft", "bottmid", "bottright"]
    ];
    var choice = choices[x][y];
    makeMove(choice);
  }
  //winning moves
  //top horizontal winning move
  else {
    if (cells.topleft === botSide && cells.topmid === botSide && cells.topright === "") {
      makeMove("topright");
      result = "botWon";
      showWin("topleft", "topmid", "topright");
    } else if (cells.topleft === botSide && cells.topmid === "" && cells.topright === botSide) {
      makeMove("topmid");
      result = "botWon";
      showWin("topleft", "topmid", "topright");
    } else if (cells.topleft === "" && cells.topmid === botSide && cells.topright === botSide) {
      makeMove("topleft");
      result = "botWon";
      showWin("topleft", "topmid", "topright");
    }
    //mid horizontal winning move
    else if (cells.midleft === botSide && cells.midmid === botSide && cells.midright === "") {
      makeMove("midright");
      result = "botWon";
      showWin("midleft", "midmid", "midright");
    } else if (cells.midleft === botSide && cells.midmid === "" && cells.midright === botSide) {
      makeMove("midmid");
      result = "botWon";
      showWin("midleft", "midmid", "midright");
    } else if (cells.midleft === "" && cells.midmid === botSide && cells.midright === botSide) {
      makeMove("midleft");
      result = "botWon";
      showWin("midleft", "midmid", "midright");
    }
    //bottom horizontal winning move
    else if (cells.bottleft === botSide && cells.bottmid === botSide && cells.bottright === "") {
      makeMove("bottright");
      result = "botWon";
      showWin("bottleft", "bottmid", "bottright");
    } else if (cells.bottleft === botSide && cells.bottmid === "" && cells.bottright === botSide) {
      makeMove("bottmid");
      result = "botWon";
      showWin("bottleft", "bottmid", "bottright");
    } else if (cells.bottleft === "" && cells.bottmid === botSide && cells.bottright === botSide) {
      makeMove("bottleft");
      result = "botWon";
      showWin("bottleft", "bottmid", "bottright");
    }
    //left vertical winning move
    else if (cells.topleft === botSide && cells.midleft === botSide && cells.bottleft === "") {
      makeMove("bottleft");
      result = "botWon";
      showWin("topleft", "midleft", "bottleft");
    } else if (cells.topleft === botSide && cells.midleft === "" && cells.bottleft === botSide) {
      makeMove("midleft");
      result = "botWon";
      showWin("topleft", "midleft", "bottleft");
    } else if (cells.topleft === "" && cells.midleft === botSide && cells.bottleft === botSide) {
      makeMove("topleft");
      result = "botWon";
      showWin("topleft", "midleft", "bottleft");
    }
    //mid vertical winning move
    else if (cells.topmid === botSide && cells.midmid === botSide && cells.bottmid === "") {
      makeMove("bottmid");
      result = "botWon";
      showWin("topmid", "midmid", "bottmid");
    } else if (cells.topmid === botSide && cells.midmid === "" && cells.bottmid === botSide) {
      makeMove("midmid");
      result = "botWon";
      showWin("topmid", "midmid", "bottmid");
    } else if (cells.topmid === "" && cells.midmid === botSide && cells.bottmid === botSide) {
      makeMove("topmid");
      result = "botWon";
      showWin("topmid", "midmid", "bottmid");
    }
    //right vertical winning move
    else if (cells.topright === botSide && cells.midright === botSide && cells.bottright === "") {
      makeMove("bottright");
      result = "botWon";
      showWin("topright", "midright", "bottright");
    } else if (cells.topright === botSide && cells.midright === "" && cells.bottright === botSide) {
      makeMove("midright");
      result = "botWon";
      showWin("topright", "midright", "bottright");
    } else if (cells.topright === "" && cells.midright === botSide && cells.bottright === botSide) {
      makeMove("topright");
      result = "botWon";
      showWin("topright", "midright", "bottright");
    }
    //left cross winning move
    else if (cells.topleft === botSide && cells.midmid === botSide && cells.bottright === "") {
      makeMove("bottright");
      result = "botWon";
      showWin("topleft", "midmid", "bottright");
    } else if (cells.topleft === botSide && cells.midmid === "" && cells.bottright === botSide) {
      makeMove("midmid");
      result = "botWon";
      showWin("topleft", "midmid", "bottright");
    } else if (cells.topleft === "" && cells.midmid === botSide && cells.bottright === botSide) {
      makeMove("topleft");
      result = "botWon";
      showWin("topleft", "midmid", "bottright");
    }
    //right cross winning move
    else if (cells.topright === botSide && cells.midmid === botSide && cells.bottleft === "") {
      makeMove("bottleft");
      result = "botWon";
      showWin("topright", "midmid", "bottleft");
    } else if (cells.topright === botSide && cells.midmid === "" && cells.bottleft === botSide) {
      makeMove("midmid");
      result = "botWon";
      showWin("topright", "midmid", "bottleft");
    } else if (cells.topright === "" && cells.midmid === botSide && cells.bottleft === botSide) {
      makeMove("topright");
      result = "botWon";
      showWin("topright", "midmid", "bottleft");
    }
    //blocking moves
    //top horizontal blocking move
    else if (cells.topleft === userSide && cells.topmid === userSide && cells.topright === "") {
      makeMove("topright");
    } else if (cells.topleft === userSide && cells.topmid === "" && cells.topright === userSide) {
      makeMove("topmid");
    } else if (cells.topleft === "" && cells.topmid === userSide && cells.topright === userSide) {
      makeMove("topleft");
    }

    //mid horizontal blocking move
    else if (cells.midleft === userSide && cells.midmid === userSide && cells.midright === "") {
      makeMove("midright");
    } else if (cells.midleft === userSide && cells.midmid === "" && cells.midright === userSide) {
      makeMove("midmid");
    } else if (cells.midleft === "" && cells.midmid === userSide && cells.midright === userSide) {
      makeMove("midleft");
    }
    //bottom horizontal blocking move
    else if (cells.bottleft === userSide && cells.bottmid === userSide && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.bottleft === userSide && cells.bottmid === "" && cells.bottright === userSide) {
      makeMove("bottmid");
    } else if (cells.bottleft === "" && cells.bottmid === userSide && cells.bottright === userSide) {
      makeMove("bottleft");
    }
    //left vertical blocking move
    else if (cells.topleft === userSide && cells.midleft === userSide && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.topleft === userSide && cells.midleft === "" && cells.bottleft === userSide) {
      makeMove("midleft");
    } else if (cells.topleft === "" && cells.midleft === userSide && cells.bottleft === userSide) {
      makeMove("topleft");
    }
    //mid vertical blocking move
    else if (cells.topmid === userSide && cells.midmid === userSide && cells.bottmid === "") {
      makeMove("bottmid");
    } else if (cells.topmid === userSide && cells.midmid === "" && cells.bottmid === userSide) {
      makeMove("midmid");
    } else if (cells.topmid === "" && cells.midmid === userSide && cells.bottmid === userSide) {
      makeMove("topmid");
    }
    //right vertical blocking move
    else if (cells.topright === userSide && cells.midright === userSide && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.topright === userSide && cells.midright === "" && cells.bottright === userSide) {
      makeMove("midright");
    } else if (cells.topright === "" && cells.midright === userSide && cells.bottright === userSide) {
      makeMove("topright");
    }
    //left cross blocking move
    else if (cells.topleft === userSide && cells.midmid === userSide && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.topleft === userSide && cells.midmid === "" && cells.bottright === userSide) {
      makeMove("midmid");
    } else if (cells.topleft === "" && cells.midmid === userSide && cells.bottright === userSide) {
      makeMove("topleft");
    }
    //right cross blocking move
    else if (cells.topright === userSide && cells.midmid === userSide && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.topright === userSide && cells.midmid === "" && cells.bottleft === userSide) {
      makeMove("midmid");
    } else if (cells.topright === "" && cells.midmid === userSide && cells.bottleft === userSide) {
      makeMove("topright");
    }
    //forking moves
    else if (cells.topmid === botSide && cells.bottleft === userSide && cells.topleft === "" && cells.topright === "" && cells.midmid === "") {
      makeMove("topleft");
    } else if (cells.topmid === botSide && cells.bottright === userSide && cells.topleft === "" && cells.topright === "" && cells.midmid === "") {
      makeMove("topright");
    } else if (cells.bottmid === botSide && cells.topleft === userSide && cells.bottleft === "" && cells.bottright === "" && cells.midmid === "") {
      makeMove("bottleft");
    } else if (cells.bottmid === botSide && cells.topright === userSide && cells.bottleft === "" && cells.bottright === "" && cells.midmid === "") {
      makeMove("bottright");
    } else if (cells.midleft === botSide && cells.topright === userSide && cells.bottleft === "" && cells.topleft === "" && cells.midmid === "") {
      makeMove("topleft");
    } else if (cells.midleft === botSide && cells.bottright === userSide && cells.bottleft === "" && cells.topleft === "" && cells.midmid === "") {
      makeMove("bottleft");
    } else if (cells.midright === botSide && cells.topleft === userSide && cells.bottright === "" && cells.topright === "" && cells.midmid === "") {
      makeMove("topright");
    } else if (cells.midright === botSide && cells.bottleft === userSide && cells.bottright === "" && cells.topright === "" && cells.midmid === "") {
      makeMove("bottright");
    } else if (cells.topleft === botSide && cells.bottleft === userSide && cells.topmid === "" && cells.topright === "") {
      makeMove("topright");
    } else if (cells.topleft === botSide && cells.topright === userSide && cells.midleft === "" && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.topright === botSide && cells.bottright === userSide && cells.topmid === "" && cells.topleft === "") {
      makeMove("topleft");
    } else if (cells.topright === botSide && cells.topleft === userSide && cells.midright === "" && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.bottright === botSide && cells.bottleft === userSide && cells.midright === "" && cells.toptright === "") {
      makeMove("topright");
    } else if (cells.bottright === botSide && cells.topright === userSide && cells.bottpmid === "" && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.bottleft === botSide && cells.topleft === userSide && cells.bottmid === "" && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.bottleft === botSide && cells.bottright === userSide && cells.midleft === "" && cells.topleft === "") {
      makeMove("topleft");
    } else if (cells.topleft === botSide && cells.bottright === userSide && cells.topmid === "" && cells.topright === "") {
      makeMove("topright");
    } else if (cells.topleft === botSide && cells.bottright === userSide && cells.midleft === "" && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.topright === botSide && cells.bottleft === userSide && cells.topmid === "" && cells.topleft === "") {
      makeMove("topleft");
    } else if (cells.topright === botSide && cells.bottleft === userSide && cells.midright === "" && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.bottleft === botSide && cells.topright === userSide && cells.midleft === "" && cells.topleft === "") {
      makeMove("topleft");
    } else if (cells.bottleft === botSide && cells.topright === userSide && cells.bottmid === "" && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.bottright === botSide && cells.topleft === userSide && cells.bottmid === "" && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.bottright === botSide && cells.topleft === userSide && cells.midright === "" && cells.topright === "") {
      makeMove("topright");
    } else if (cells.midmid === userSide && cells.topleft === botSide && cells.bottright === "" && ((cells.topmid === "" && cells.topright === "" && cells.midright === "") || (cells.midleft === "" && cells.bottleft === "" && cells.bottmid === ""))) {
      makeMove("bottright");
    } else if (cells.midmid === userSide && cells.bottright === botSide && cells.topleft === "" && ((cells.topmid === "" && cells.topright === "" && cells.midright === "") || (cells.midleft === "" && cells.bottleft === "" && cells.bottmid === ""))) {
      makeMove("topleft");
    } else if (cells.midmid === userSide && cells.topright === botSide && cells.bottleft === "" && ((cells.topmid === "" && cells.topleft === "" && cells.midleft === "") || (cells.midright === "" && cells.bottright === "" && cells.bottmid === ""))) {
      makeMove("bottleft");
    } else if (cells.midmid === userSide && cells.bottleft === botSide && cells.topright === "" && ((cells.topmid === "" && cells.topleft === "" && cells.midleft === "") || (cells.midright === "" && cells.bottright === "" && cells.bottmid === ""))) {
      makeMove("topright");
    } else if (cells.topmid === botSide && cells.midleft === botSide && cells.topright === "" && cells.bottleft === "" && cells.topleft === "") {
      makeMove("topleft");
    } else if (cells.topmid === botSide && cells.midright === botSide && cells.topleft === "" && cells.bottright === "" && cells.topright === "") {
      makeMove("topright");
    } else if (cells.bottmid === botSide && cells.midleft === botSide && cells.bottright === "" && cells.topleft === "" && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.bottmid === botSide && cells.midright === botSide && cells.bottleft === "" && cells.topright === "" && cells.bottright === "") {
      makeMove("bottright");

    } else if (cells.topmid === botSide && cells.topleft === userSide && cells.midmid === "" && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.topmid === botSide && cells.topright === userSide && cells.midmid === "" && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.bottmid === botSide && cells.bottleft === userSide && cells.midmid === "" && cells.topright === "") {
      makeMove("topright");
    } else if (cells.bottmid === botSide && cells.bottright === userSide && cells.midmid === "" && cells.topleft === "") {
      makeMove("topleft");
    } else if (cells.midleft === botSide && cells.bottleft === userSide && cells.midmid === "" && cells.topright === "") {
      makeMove("topright");
    } else if (cells.midleft === botSide && cells.topleft === userSide && cells.midmid === "" && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.midright === botSide && cells.bottright === userSide && cells.midmid === "" && cells.topleft === "") {
      makeMove("topleft");
    } else if (cells.midrigt === botSide && cells.topright === userSide && cells.midmid === "" && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.topmid === botSide && cells.bottmid === userSide && cells.midmid === "" && cells.midleft === "") {
      makeMove("midleft");
    } else if (cells.bottmid === botSide && cells.topmid === userSide && cells.midmid === "" && cells.midright === "") {
      makeMove("midright");
    } else if (cells.midleft === botSide && cells.midright === userSide && cells.midmid === "" && cells.topmid === "") {
      makeMove("topmid");
    } else if (cells.midright === botSide && cells.midleft === userSide && cells.midmid === "" && cells.bottmid === "") {
      makeMove("bottmid");
    }
    //center if empty
    else if (cells.midmid === "") {
      makeMove("midmid");
    }
    //opposite corners if empty
    else if (cells.topleft === userSide && cells.bottright === "") {
      makeMove("bottright");
    } else if (cells.topright === userSide && cells.bottleft === "") {
      makeMove("bottleft");
    } else if (cells.bottleft === userSide && cells.topright === "") {
      makeMove("topright");
    } else if (cells.bottright === userSide && cells.topleft === "") {
      makeMove("topleft");
    }
    //any corner if empty
    else if (cells.topleft === "" && cells.midright === userSide) {
      makeMove("topleft");
    } else if (cells.topright === "" && cells.bottmid === userSide) {
      makeMove("topright");
    } else if (cells.bottleft === "" && cells.topmid === userSide) {
      makeMove("bottleft");
    } else if (cells.bottright === "" && cells.midleft === userSide) {
      makeMove("bottright");
    }
    //any empty cell
    else if (cells.topmid === "") {
      makeMove("topmid");
    } else if (cells.midright === "") {
      makeMove("midright");
    } else if (cells.bottmid === "") {
      makeMove("bottmid");
    } else if (cells.midleft === "") {
      makeMove("midleft");
    }
  }
  totalMoves++;
  //tie condition
  if (totalMoves === 9 && result !== "botWon") {
    result = "tied";
    setTimeout(function() {
      chooseXO();
    }, 1000);
  }
  console.log(totalMoves);
}