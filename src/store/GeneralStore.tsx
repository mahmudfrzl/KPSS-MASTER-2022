import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios"
import { message } from "antd";


let url_dersler ='http://localhost:8080/api'


class GeneralStore{
    dersler:any[]=[]
    ders_update:boolean=false
    ders:any={}

    konular:any[]=[]
    konu_update:boolean=false
    konu:any={}

    testler:any[]=[]
    test_update:boolean=false
    test:any={}

    notlar:any[]=[]
    note_update:boolean=false
    not:any={}

    sorular:any[]=[]
    question_update:boolean=false
    soru:any={}


    cevaplar:any[]=[]
    cevap_update:boolean=false
    cevap:any={}

    type:boolean=false

    constructor(){
        makeAutoObservable(this)
    }

    getDersler=async()=>{
        const data=await axios.get(url_dersler+'/lessons/getAll')
        runInAction(()=>{
            this.dersler=data.data.data
        })
    }
    postDers=async(values:any)=>{
    
        const data=await axios.post(`${url_dersler}/lessons/create?description=${values.description}&name=${values.name}`,values)
        this.getDersler()
        runInAction(()=>this.ders_update=false)
        message.success(data.data.message)
    }
    updateDers=async(values:any)=>{
      const data:any= await axios.put(`${url_dersler}/update?lessonID=${this.ders.lessonID}`,values)
      this.getDersler()
      runInAction(()=>{
          this.ders_update=false
      }) 
      message.success(data.data.message)
    }

    getKonu=async()=>{
        const data=await axios.get(`${url_dersler}/subjects/getAll`)
        runInAction(()=>{
            this.konular=data.data.data
        })
    }

    updateKonu = async(values:any) =>{
        const data:any = await axios.put(`${url_dersler}/subjects/update?subjectID=${this.konu.subjectID}`,values)
        this.getKonu();
        runInAction(()=>{
            this.konu_update=false
        }) 
        message.success(data.data.message)
    }

    
    getTestler=async()=>{
        const data=await axios.get(url_dersler+'/test/getAll')
        runInAction(()=>{
            this.testler=data.data.data
        })
    }

    updateTest = async(values:any) =>{
        const data:any = await axios.put(`${url_dersler}/test/update?testID=${this.test.testID}`,values)
        this.getTestler();
        runInAction(()=>{
            this.test_update=false
        }) 
        message.success(data.data.message)
    }


    getNotlar=async()=>{
        const data=await axios.get(url_dersler+'/notes/getAll')
        runInAction(()=>{
            this.notlar=data.data.data
        })
    }

    
    updateNot = async(values:any) =>{
        const data:any = await axios.put(`${url_dersler}/notes/update?noteID=${this.not.noteID}`,values)
        this.getNotlar();
        runInAction(()=>{
            this.note_update=false
        }) 
        message.success(data.data.message)
    }

    
    getSorular=async()=>{
        const data=await axios.get(url_dersler+'/questions/getAll')
        runInAction(()=>{
            this.sorular=data.data.data
        })
    }

    updateSorular = async(values:any) =>{
        const data = await axios.put(`${url_dersler}/questions/update?questionID=${this.soru.questionID}`,values)
        this.getSorular();
        runInAction(()=>{
            this.question_update=false
        }) 
        message.success(data.data.message)
    }


    getCevaplar=async()=>{
        const data=await axios.get(url_dersler+'/answers/getAll')
        runInAction(()=>{
            this.cevaplar=data.data.data
        })
    }

    updateCevaplar = async(values:any) =>{
        const data = await axios.put(`${url_dersler}/answers/update?answerID=${this.cevap.answerID}`,values)
        this.getCevaplar();
        runInAction(()=>{
            this.cevap_update=false
        }) 
        message.success(data.data.message)
    }


}



export default new GeneralStore()