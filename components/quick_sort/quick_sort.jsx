import React from 'react';
import QuickSortSolve from './quick_sort_class';
import Solution from '../solutions/solution';
import QuickSortExercise from './quick_sort_exercise'

export default class QuickSort extends React.Component {
  constructor(){
    super()
    this.state = {
      iterationCounter: 0,
      solved: false,
      update: false,
      demoStarted: false,
      exerciseStarted: false
    };
    this.addClassIntervalSpeed = 500;
    this.showDeconsctructedArraySpeed = 200;
    this.resetIterationIntervalSpeed = 600;
    this.switchArrayToSubarraySpeed =300;
    this.clearSubArraySpeed = 1000;
    this.pivot = this.pivot.bind(this);
    this.handleArrayShuffle = this.handleArrayShuffle.bind(this)
    this.addClassName = this.addClassName.bind(this)
    this.handleClickStart = this.handleClickStart.bind(this);
    this.classClear = this.classClear.bind(this);
    this.handleChildClick = this.handleChildClick.bind(this);
    // this.startArray = [3, 8, 12, 6, 5, 18, 17, 19, 9]

    this.startArray = this.randomArray()
    var newQuickSort = new QuickSortSolve
    this.sorting = newQuickSort.quickSort(this.startArray)
    this.result = newQuickSort.result()
  }

  randomArray(){
    const newArr = []
    const arrLength = Math.floor(Math.random()*3 + 6)
    for (let i = 0; i < arrLength; i++){
      let newNum = Math.floor(Math.random()*20)
      if (!newArr.includes(newNum)){
        newArr.push(newNum)
      } else {
        i--
      }
    }
    return newArr
  }

  update(input){
    return e => this.setState({
      [input]: e.currentTarget.value
    })
  }

  clearDeconstructedArray(){
    ["pivot", "smaller", "larger"].forEach((el) => {
      var i = document.getElementsByClassName(`${el}Show`)
      while (i.length){
        i[0].className=`${el}Hidden`
      }
    })
  }

  classClear(){
    ["smaller", "larger", "active", "hidden", "unfocused"].forEach( (el) =>{
      var nums = document.getElementsByClassName(el)
      let j =0
      while (j < nums.length && nums.length > 0) {
        var currArray = this.result[this.state.iterationCounter][0]
        var num = parseInt((nums[j].getAttribute("name")))
        if (currArray.includes(num)){
          nums[j].className="active"
        } else {
          nums[j].className="unfocused"
        }
        j += 1
      }
    })
  }

  findIndexes(){
    let newArr = []
    var sortedSet = this.result[this.state.iterationCounter][2]
    .concat(this.result[this.state.iterationCounter][3])
    .concat(this.result[this.state.iterationCounter][1])
    for (let i = 0; i < sortedSet.length; i++){
      var idx = this.startArray.indexOf(sortedSet[i])
      newArr.push(idx)
    }
    return newArr.sort((a, b) => a-b)
  }

  insertArrayByIndex(){
    var indexSet = this.findIndexes()
    var sortedSet = this.result[this.state.iterationCounter][2]
    .concat(this.result[this.state.iterationCounter][3])
    .concat(this.result[this.state.iterationCounter][1])
    for(let i = 0; i< indexSet.length; i++){
      this.startArray[indexSet[i]] = sortedSet[i]
    }
  }

  addClassName(){
    if (!this.state.demoStarted){
      debugger
      return
    }
      this.classClear()
      var x = document.getElementsByClassName(`active`)
      const count = x.length
      let counter = 0
      const pivotNum = this.result[this.state.iterationCounter][3][0]
      this.addClassInterval = setInterval( () => {
        if (!x.length){
          clearInterval(this.addClassInterval)
          this.showSmaller()
          return
        }
        var currNum = parseInt(x[0].getAttribute("name"))
        if (currNum === pivotNum){
          x[0].className = "pivot"
        } else if (currNum > pivotNum){
          x[0].className = "larger"
        } else if (currNum < pivotNum){
          x[0].className = "smaller"
        }
        counter += 1
      }, this.addClassIntervalSpeed)
  }

  showSmaller(){
    if (!this.state.demoStarted){
      return
    }
    var counter = 0
    this.switchSmaller = setInterval(() => {
      switch(counter){
        case 1:
        var i = document.getElementsByClassName("smaller")
        while (i.length){
          i[0].className="hidden"
        }
        case 2:
        var i = document.getElementsByClassName("smallerHidden")
        if (this.result[this.state.iterationCounter][2].length > 0){
          while (i.length){
            i[0].className="smallerShow"
          }
          var j = document.getElementsByClassName("smallerTextHidden")
          while (j.length){
            j[0].className="smallerTextShow"
          }
        }
        case 3:
        clearInterval(this.switchSmaller)
        this.showPivot()
        if (!this.state.demoStarted){
          var j = document.getElementsByClassName("smallerTextShow")
          while (j.length){
            j[0].className="smallerTextHidden"
          }
          var i = document.getElementsByClassName("smallerShow")
            while (i.length){
              i[0].className="smallerHidden"
            }
          return
        }
        return
      }
      counter += 1
    }, this.switchArrayToSubarraySpeed)
  }

  showPivot(){
    var counter = 0
    this.switchPivot = setInterval( ()=> {
      switch(counter){
        case 1:
        var i = document.getElementsByClassName("pivot")
        while (i.length){
          i[0].className="hidden"
        }
        case 2:
        var i = document.getElementsByClassName("pivotHidden")
          while (i.length){
            i[0].className="pivotShow"
            var j = document.getElementsByClassName("pivotTextHidden")
            while (j.length){
              j[0].className="pivotTextShow"
            }
          }
        case 3:
        clearInterval(this.switchPivot);
        this.showLarger()
        if (!this.state.demoStarted){
          var j = document.getElementsByClassName("pivotTextShow")
          while (j.length){
            j[0].className="pivotTextHidden"
          }
          var i = document.getElementsByClassName("pivotShow")
            while (i.length){
              i[0].className="pivotHidden"
            }
          return
        }
        return
      }
      counter += 1
    }, this.switchArrayToSubarraySpeed)
  }

  showLarger(){
    if (!this.state.demoStarted){
      return
    }
    var counter = 0
    this.switchLarger = setInterval( () => {
      switch(counter){
        case 1:
        var i = document.getElementsByClassName("larger")
        while (i.length){
          i[0].className = "hidden"
        }
        case 2:
        var i = document.getElementsByClassName("largerHidden")
        if (this.result[this.state.iterationCounter][1].length > 0){
          while (i.length){
            i[0].className = "largerShow"
          }
          var j = document.getElementsByClassName("largerTextHidden")
          while (j.length){
            j[0].className="largerTextShow"
          }
        }
        case 3:
        clearInterval(this.switchLarger)
        this.renderHiddenSortedAndClearSubArray()
        if (!this.state.demoStarted){
          var j = document.getElementsByClassName("largerTextShow")
          while (j.length){
            j[0].className="largerTextHidden"
          }
          var i = document.getElementsByClassName("largerShow")
            while (i.length){
              i[0].className="largerHidden"
            }
          return
        }
        return
      }
      counter += 1
    }, this.switchArrayToSubarraySpeed)
  }

  renderHiddenSortedAndClearSubArray(){
    if (!this.state.demoStarted){
      return
    }
    var counter = 0
    this.clearSubArray = setInterval( () => {
      var currentArray = this.result[this.state.iterationCounter][0]
      switch(counter){
        case 1:
          this.insertArrayByIndex()
          this.forceUpdate()
        case 2:
          ["pivotShow", "largerShow", "smallerShow", "pivotTextShow", "largerTextShow", "smallerTextShow"].forEach((subArrayClass) => {
            var i = document.getElementsByClassName(subArrayClass)
            while(i.length){
              i[0].className = subArrayClass.replace("Show", "Hidden")
            }
          })
        case 3:
          var nums = document.getElementsByClassName("hidden")
          var pivotNum = this.result[this.state.iterationCounter][3][0].toString()
          var activeArray = this.result[this.state.iterationCounter][0]
          var pivot = this.result[this.state.iterationCounter][3]
          var smaller = this.result[this.state.iterationCounter][2]
          var larger = this.result[this.state.iterationCounter][1]
          var smallPivot = this.result[this.state.iterationCounter][2].concat(this.result[this.state.iterationCounter][3])
          var pivotLarge = this.result[this.state.iterationCounter][3].concat(this.result[this.state.iterationCounter][1])
            if(this.result[this.state.iterationCounter][3].length < 2 && this.result[this.state.iterationCounter][3].length > 0){
              var largest = document.querySelectorAll(`[name="${this.result[this.state.iterationCounter][3][0]}"]`)
              largest[0].className = "sorted"
              }
            if (activeArray.length < 3){
              var sorted = document.getElementsByClassName("active")
              while (nums[0]){
                  nums[0].className = "sorted"
              }
            }
            if (pivot.length === 1 && smaller.length === 1 && larger.length === 1){
              var sorted = document.getElementsByClassName("hidden")
              for (let i = 0; i < sorted.length; i++){
                if (sorted[i]){
                  if ( smallPivot.includes(parseInt(sorted[i].getAttribute("name")))){
                    sorted[i].className= "sorted"
                  }
                }
              }
            }
            if (smallPivot.length < 3){
              var sorted = document.getElementsByClassName("hidden")
              for (let i = 0; i < sorted.length; i++){
                if (sorted[i]){
                  if ( smallPivot.includes(parseInt(sorted[i].getAttribute("name")))){
                    sorted[i].className= "sorted"
                  }
                }
              }
            }

            if (pivotLarge.length < 3){
              // for (let j=0; j < 3; j++){
                var sorted = document.getElementsByClassName("hidden")
                for (let i = 0; i < sorted.length; i++){

                  // if (sorted[i].getAttribute("name")){
                    if ( pivotLarge.includes(parseInt(sorted[i].getAttribute("name")))){
                      sorted[i].className= "sorted"
                    }
                  // }
                }
              // }
            }
          clearInterval(this.clearSubArray)
        case 4:
        if (this.result[this.state.iterationCounter + 1][0].length < 1){
          this.setState({solved: true, demoStarted: false})
        } else {
          this.setState({iterationCounter: this.state.iterationCounter += 1})
          this.setNewActiveElements()
        }
      }
      counter += 1
    }, this.clearSubArraySpeed)
  }

  setNewActiveElements(){
    if (!this.state.demoStarted){
      return
    }
    var currentArray = this.result[this.state.iterationCounter][0];
    var pivotNum = this.result[this.state.iterationCounter - 1][3][0];
    for (let x=0; x < 20; x++){
      ["hidden","active", "unfocused"].forEach( (el) => {
        var j = document.getElementsByClassName(el);
        for (let i=0; i < j.length; i++){
          var num = parseInt((j[i].getAttribute("name")));
          var test = currentArray.includes(num);
          if (num === pivotNum){
            j[i].className="sorted"
          }
          else if (!test){
            j[i].className="unfocused";
          } else if (test) {
            j[i].className="active";
          }
        }
      })
    }
    this.addClassName()
  }

  showDeconsctructedArray(){
    if (!this.state.demoStarted){
      return
    }
    let counter = 0
    this.deconstructArrayInterval = setInterval( ()=> {
      if (counter === 6){
        clearInterval(this.deconstructArrayInterval)
        this.resetIteration()
        this.reRenderFullArray()
        return
      }
      if (counter === 1) {
        this.showPivot()
      }
      else if (counter === 2){
        this.showSmaller()
      } else if (counter === 3) {
        this.showLarger()
      }
      counter += 1
    }, this.showDeconsctructedArraySpeed)
  }

  resetIteration(){
    if (!this.state.demoStarted){
      return
    }
    let counter = 0
    this.resetIterationInterval = setInterval( () =>{
      if (counter === 1){
        this.insertArrayByIndex()
        this.setState({iterationCounter: this.state.iterationCounter += 1})
        this.classClear()
        if (this.result[this.state.iterationCounter]){
          this.addClassName()
        } else {
          this.setState({demoStarted: false})
          return
        }
      } else if (counter === 2){
        this.clearDeconstructedArray()
      } else if (counter === 3){
        clearInterval(this.resetIterationInterval)
      }
      counter += 1
    },this.resetIterationIntervalSpeed)
  }

  reRenderFullArray(){
    if (!this.state.demoStarted){
      return
    }
    ["pivot", "smaller", "larger"].forEach((el) => {
      var i = document.getElementsByClassName(el)
      while (i.length){
        i[0].className=`active`
      }
    })
  }

  pivot(){
    return (
      <span className="pivotHidden">
        {this.result[this.state.iterationCounter][3].toString()}
      </span>
    )
  }
  largerThanPivot(){
    return(
      this.result[this.state.iterationCounter][1].map( (el, i) => {
        return(
          <span key={i} className="largerHidden"> {el} </span>
        )
      })
    )
  }
  smallerThanPivot(){
    return(
      this.result[this.state.iterationCounter][2].map( (el, i) => {
        return(
          <span key={i} className="smallerHidden"> {el} </span>
        )
      })
    )
  }

  initiate(){
    var init = document.getElementsByClassName("quicksortIdle")
    while (init.length){
      init[0].className = "active"
    }
    this.addClassName()
  }

  handleClickStart(){
    var sorted = document.getElementsByClassName("sorted")
    var counter = 0
    if (!this.startArray.length == sorted.length && !this.state.demoStarted){
      this.clickStart = setInterval( () => {
        switch(counter){
          case 0:
          this.setState({demoStarted: true})
          case 1:
          this.initiate()
          clearInterval(this.clickStart)
        }
        counter += 1
      }, 300)

    }
    else {
      return
    }
  }

  focusAll(){
    if (!this.state.demoStarted){
      return
    }
    for (let i=0; i < 8; i++){
      ["unfocused", "hidden", "smaller", "larger"].forEach( (el) => {
        var nums = document.getElementsByClassName(el)
        while (nums.length){
          nums[0].className = "sorted"
        }
      })
    }
  }

  trueArray(){
    return(
      this.startArray.map( (el, i )=> {
        return(
          <span name={el} key={i} className="quicksortIdle"> {el}</span>
        )
      })
    )
  }

  handleArrayShuffle(){
    this.setState({demoStarted: false, iterationCounter: 0})
    this.clearDeconstructedArray()
    this.setState({iterationCounter: 0, solved: false})
    this.startArray = this.randomArray()
    var newQuickSort = new QuickSortSolve
    this.sorting = newQuickSort.quickSort(this.startArray)
    this.result = newQuickSort.result()
    // while (
      // document.getElementsByClassName("quicksortIdle").length != this.startArray.length){
        // debugger
        for (var i=0; i < 2; i++){
          ["hidden",
          "sorted",
          "larger",
          "smaller",
          "active",
          "unfocused",
          "pivot"
        ].forEach( (className) => {
          var init = document.getElementsByClassName(className)
          while (init.length){
            init[0].className = "quicksortIdle"
          }
        })
        }
      // }
      var includesHidden = true
      while (includesHidden){
        var counter = 0
        for (var i=0; i < 2; i++){
          [
            "smallerTextShow",
            "largerTextShow",
            "pivotTextShow"
          ].forEach ( (className) => {
            var init = document.getElementsByClassName(className)
            counter += init.length
            while (init.length) {
              init[0].className = `${className.replace("Show", "Hidden")}`
            }
          });
          ["hidden",
          "sorted",
          "larger",
          "smaller",
          "active",
          "unfocused",
          "pivot"
        ].forEach( (className) => {
          var init = document.getElementsByClassName(className)
          counter += init.length
          while (init.length){
            init[0].className = "quicksortIdle"
          }
        })
      }
      if (counter == 0){
        includesHidden = false
      }
    }
  }

  resetArray(){
    if (!this.state.demoStarted){
      return
    }
    ["unfocused", "hidden", "smaller", "larger", "sorted"].forEach( (el) => {
      var nums = document.getElementsByClassName(el)
      while (nums.length){
        nums[0].className = "active"
      }
    })
  }

  handleChildClick(){
    if (this.state.exerciseStarted) {
      this.setState({exerciseStarted: false})
    } else {
      this.setState({exerciseStarted: true})
    }
  }

  render(){
    return (
      <div className="main-container">
        <div className="demo-and-exercise">
          <div className="quicksort-demo">
              <div className="quicksort-demo-buttons">
                <div>
                  <button onClick={this.handleClickStart} className="quicksort-demo-start">
                    Start
                  </button>
                </div>
                <div>
                  <button onClick={this.handleArrayShuffle} className="quicksort-demo-newarray">
                    New Array
                  </button>
                </div>
              </div>
              <div className="quicksort-demo-array">
                {this.trueArray()}
              </div>
              <div className="subarray-container">
                <div className="subarray-output">
                  <div className="subarray">
                    {this.smallerThanPivot()}
                  </div>
                  <div className="smallerTextHidden">
                      smaller
                  </div>
                </div>
                <div className="subarray-output">
                  <div className="subarray">
                    {this.pivot()}
                  </div>
                  <div className="pivotTextHidden">
                      pivot
                  </div>
                </div>
                <div className="subarray-output">
                  <div className="subarray">
                    {this.largerThanPivot()}
                  </div>
                  <div className="largerTextHidden">
                      larger
                  </div>
                </div>
              </div>
          </div>
          <div className="quicksort-exercise-andrew">
          {<QuickSortExercise demoState={this.handleChildClick}/> }
          </div>
        </div>
        <div className="solution-container"><Solution algorithm="quicksort"/></div>
      </div>
    )
  }
}
