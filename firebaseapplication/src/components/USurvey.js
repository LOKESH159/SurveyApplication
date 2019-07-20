import React, { Component } from 'react';

var firebase = require("firebase");
var uuid = require("uuid");
var firebaseConfig = {
    apiKey: "AIzaSyC043klDGtB9HkERGD8n9fCszI2_pBbTTE",
    authDomain: "usurvey1590.firebaseapp.com",
    databaseURL: "https://usurvey1590.firebaseio.com",
    projectId: "usurvey1590",
    storageBucket: "",
    messagingSenderId: "606350826237",
    appId: "1:606350826237:web:58a8ae657864ecf7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
class USurvey extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            uid:uuid.v1(),
            userName :"",
            answers :{
                answer1:"",
                answer2:"",
                answer3:""
            },
            isSubmitted:false
        }
        this.onUserNameSubmit = this.onUserNameSubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.onSubmitSurvey = this.onSubmitSurvey.bind(this);
    }

    onUserNameSubmit(){
       
        console.log(this.refs.inputUserName.value)
         this.setState({
            userName :this.refs.inputUserName.value
         });

    }
    answerSelected (e){
    console.log(document.querySelector('input[name="answer1"]:checked').value);
    var  answer1 = document.querySelector('input[name="answer1"]:checked');
    var  answer2 = document.querySelector('input[name="answer2"]:checked');
    var  answer3 = document.querySelector('input[name="answer3"]:checked');
    var first ,second,third;
    if(answer1){
        first  = answer1.value;
    }
    if(answer2){
        second  = answer2.value;
    }
    if(answer3){
        third  = answer3.value;
    }
   
        this.setState({
            answers:{
                answer1:first,
                answer2:second,
                answer3:third
            }
        });
      
   
      console.log(this.state)
    

    }
    onSubmitSurvey(){
        console.log(this.state)
        firebase.database().ref("USurvey/"+this.state.uid).set({
            userName :this.state.userName,
            answers :this.state.answers
        });
        this.setState({
            isSubmitted :true
        });
    }


   

    render() {
        var userName = '';
        if(!this.state.userName && !this.state.isSubmitted){
           userName = <div>
            <h1> Hey Please Enter your name</h1>
           <div >
            <input type ="text" placeholder = "Enter Your Name " className ="userName" ref ="inputUserName" />
            <div>
            <input type ="submit" value ="Enter" className = "enterButton" onClick = {this.onUserNameSubmit} />
            </div>
           </div>
           </div>;
        }
        else if(!this.state.isSubmitted) {
          userName =
          <div>
                <h1> Hey {this.state.userName} </h1>
                <h3> Please Answer the following Questions</h3>
                <form onSubmit = {this.onSubmitSurvey}>
                    <div className ="questions">
                    <label className = "label">Your Favourite Hero</label>
                    <input className ="radio" type = "radio" value = "PawanKalyan" name = "answer1" onChange = {this.answerSelected}/> PawanKalyan
                    <input className ="radio" type = "radio" value = "NTR" name = "answer1" onChange = {this.answerSelected}/> NTR
                    <input  className ="radio"type = "radio" value = "Mahesh" name = "answer1" onChange = {this.answerSelected}/> Mahesh
                    </div>
                    <div className ="questions">
                    <label className = "label">Your Favourite Heroine</label>
                    <input className ="radio" type = "radio" value = "Kajal" name = "answer2" onChange = {this.answerSelected}/> Kajal
                    <input className ="radio" type = "radio" value = "SAM" name = "answer2" onChange = {this.answerSelected}/> SAM
                    <input  className ="radio" type = "radio" value = "Sunny" name = "answer2" onChange = {this.answerSelected}/> Sunny
                    </div><div className ="questions">
                    <label className = "label">Your Favourite Movie</label>
                    <input className ="radio" type = "radio" value = "Bahubali" name = "answer3" onChange = {this.answerSelected}/> Bahubali
                    <input className ="radio" type = "radio" value = "Robo 2.0" name = "answer3" onChange = {this.answerSelected}/> Robo 2.0
                    <input className ="radio" type = "radio" value = "Manikarnika" name = "answer3" onChange = {this.answerSelected}/> Manikarnika
                    </div>
                 
                 <input type ="Submit" value = "Submit Survey" />
                 
                </form>
          </div>
       
        }
        else if(this.state.isSubmitted){
            userName = <div>
                <h1> Thanks {this.state.userName} for your Survey</h1>
            </div>
        }
        return (
            <div className = "dataForm">
               {userName}
            </div>
        );
    }
}

export default USurvey;