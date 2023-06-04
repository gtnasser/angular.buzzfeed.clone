import { Component, OnInit } from '@angular/core';
import quizzQuestions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = "nonono"

  questions:any
  questionsSelected:any
  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0
  
  finished:boolean = false
  constructor() {}

  ngOnInit(): void {
    if(quizzQuestions){

      this.title = quizzQuestions.title
      this.finished = false // reduntant...
      this.questions = quizzQuestions.questions
      this.questionsSelected = this.questions[this.questionIndex]
      this.questionIndex = 0 // redundant...
      this.questionMaxIndex = this.questions.length

    }
  }

  playerChoice(alias:any){
    console.log(this.questionIndex+1, alias)
    this.answers.push(alias)
    this.questionIndex++
    this.nextStep()
  }

  async nextStep(){
    if(this.questionIndex<this.questionMaxIndex){
      this.questionsSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers) 
      this.finished = true
      this.answerSelected = quizzQuestions.results[finalAnswer as keyof typeof quizzQuestions.results]
    }
  }

  async checkResult(anwsers: string[]) {
    const result = anwsers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
    console.log(anwsers,result)
    return result;
  }

  // se forem sempre 2 opcoes (A ou B), podemos calcular de outra maneira
  async checkResult2(answers:string[]){
    const initialValue = 0
    const result = answers.reduce(
      (accum, currValue) => {
        if(currValue=='A') {
          return accum-1
        } else {
          return accum+1
        }
      },
        initialValue
      )
      // se empatar, retorna 'A'
      if(result>0) {
        return 'B'
      } else {
        return 'A'
      }
  }

}
