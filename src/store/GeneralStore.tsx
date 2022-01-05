import { makeAutoObservable, runInAction, toJS } from "mobx";
import axios from "axios";
import { message } from "antd";
import { runInContext } from "vm";

let url_dersler = "http://37.148.211.32:8080/api";

class GeneralStore {
  dersler: any[] = [];
  ders_update: boolean = false;
  ders_create: boolean = false;
  ders: any = {};

  konular: any[] = [];
  konu_update: boolean = false;
  konu_create: boolean = false;
  konu: any = {};

  testler: any[] = [];
  test_update: boolean = false;
  test_create: boolean = false;
  test: any = {};

  notlar: any[] = [];
  note_update: boolean = false;
  create_note: boolean = false;
  not: any = {};

  sorular: any[] = [];
  question_update: boolean = false;
  create_soru: boolean = false;
  soru: any = {};

  cevaplar: any[] = [];
  cevap_update: boolean = false;
  cevap: any = {};
  cevap_create: boolean = false;

  image: any = {};
  constructor() {
    makeAutoObservable(this);
  }

  getDersler = async () => {
    const data = await axios.get(url_dersler + "/lessons/getAll");
    runInAction(() => {
      this.dersler = data.data.data;
    });
  };

  postDers = async (values: any) => {
    const fd = new FormData();
    fd.append("file", this.image);
    const data = await axios.post(
      `${url_dersler}/lessons/create2?description=${values.description}&name=${values.name}`,
      fd
    );

    this.getDersler();
    runInAction(() => (this.ders_create = false));
    message.success(data.data.message);
  };

  updateDers = async (values: any) => {
    const fd = new FormData();

    fd.append("pictureURL ", this.image);

    const data: any = await axios.put(
      // /update?deleted=true&description=dasdsa&lessonID=3&name=adsda&status=false
      `${url_dersler}/lessons/update?deleted=${values.deleted.toString()}&description=${
        values.description
      }&lessonID=${this.ders.lessonID}&name=${
        values.name
      }&status=${values.status.toString()}`,
      fd
    );
    this.getDersler();
    runInAction(() => {
      this.ders_update = false;
    });
    message.success(data.data.message);
  };

  // konu

  getKonu = async () => {
    try {
      const data = await axios.get(`${url_dersler}/subjects/getAll`);
      console.log("xxxx", toJS(data));
      console.log("bbbb", toJS(data.data));
      console.log("ccc", toJS(data.data.data));
      runInAction(() => {
        this.konular = data.data.data;
      });
    } catch (err: any) {
      console.log(err);
      if (err) {
        runInAction(() => {
          this.konular = [];
        });
      }
    }
  };

  postKonu = async (values: any) => {
    const fd = new FormData();
    console.log(this.image);

    fd.append("pictureURL", this.image);

    const data: any = await axios.post(
      `${url_dersler}/subjects/create?lessonID=${values.lessonID}&name=${values.name}`,
      fd
    );
    this.getKonu();
    runInAction(() => {
      this.konu_create = false;
    });
    message.success(data?.data?.message);
  };

  updateKonu = async (values: any) => {
    const fd = new FormData();
    console.log(this.image);

    fd.append("pictureURL", this.image);

    const data: any = await axios.put(
      `${url_dersler}/subjects/update?deleted=${values.deleted.toString()}&lessonID=${
        values.lessonID
      }&name=${values.name}&status=${values.status.toString()}&subjectID=${
        this.konu.subjectID
      }`,
      fd
    );
    this.getKonu();
    runInAction(() => {
      this.konu_update = false;
    });
    message.success(data?.data?.message);
  };

  getTestler = async () => {
    try{
      const data = await axios.get(url_dersler + "/test/getAll");
      runInAction(() => {
        this.testler = data.data.data;
      });

    }catch(err){
      if(err){
        runInAction(()=>this.testler=[])
      }
    }
  };
///test/create?forIsClosedQuestions=true&name=asdfasdf&subjectID=1
  postTest = async (values: any) => {
    const fd = new FormData();
    fd.append("picture-url", this.image);

    const data: any = await axios.post(
      `${url_dersler}/test/create?forIsClosedQuestions=${values.forIsClosedQuestions}&name=${values.name}&subjectID=${values.subjectID}`,
      fd
    );
    this.getTestler();
    runInAction(() => {
      this.test_create = false;
    });
    message.success(data.data.message);
  };

  updateTest = async (values: any) => {
    const fd = new FormData();
    fd.append("picture-url", this.image);

    const data: any = await axios.put(
      `${url_dersler}/test/update?deleted=false&name=${
        values.name
      }&status=${values.status.toString()}&subjectID=${
        values.subjectID
      }&testID=${this.test.testID}`,
      fd
    );
    this.getTestler();
    runInAction(() => {
      this.test_update = false;
    });
    message.success(data.data.message);
  };

  getNotlar = async () => {
    try{
      const data = await axios.get(url_dersler + "/notes/getAll");
      runInAction(() => {
        this.notlar = data.data.data;
      })

    }catch(err){
      if(err){
        runInAction(()=>this.notlar=[])
      }
    }
  };

  postNote = async (values: any) => {
    const fd=new FormData()
    fd.append("pictureURL", this.image);
    const data: any = await axios.post(`${url_dersler}/notes/create`, values);
    const image=axios.post(`http://localhost:8080/api/pictures/upload-photo-note?noteID=${data.data.data}`)
    this.getNotlar();
    runInAction(() => {
      this.create_note = false;
    });
    message.success(data.data.message);
  };

  updateNot = async (values: any) => {
    const data: any = await axios.put(
      `${url_dersler}/notes/update?noteID=${this.not.noteID}`,
      values
    );
    this.getNotlar();
    runInAction(() => {
      this.note_update = false;
    });
    message.success(data.data.message);
  };

  getSorular = async () => {
    try{
      const data = await axios.get(url_dersler + "/questions/getAll");
      runInAction(() => {
        this.sorular = data.data.data;
      });

    }catch(err){
      if(err){
        runInAction(()=>this.sorular=[])
      }
    }
  };

  postSorular = async (values: any) => {
    const data = await axios.post(`${url_dersler}/questions/create`, values);
    this.getSorular();
    runInAction(() => {
      this.create_soru = false;
    });
    message.success(data.data.message);
  };

  updateSorular = async (values: any) => {
    const data = await axios.put(
      `${url_dersler}/questions/update?questionID=${this.soru.questionID}`,
      values
    );
    this.getSorular();
    runInAction(() => {
      this.question_update = false;
    });
    message.success(data.data.message);
  };

  getCevaplar = async () => {
    try{
      const data = await axios.get(url_dersler + "/answers/get-all");
      runInAction(() => {
        this.cevaplar = data.data.data;
      });

    }catch(err){
      if(err){
        runInAction(()=>this.cevaplar=[])
      }
    }
  };
  postCevap = async (values: any) => {
    const data = await axios.post(url_dersler + "/answers/create", values);
    this.getCevaplar();
    runInAction(() => {
      this.cevap_create = false;
    });
    message.success(data.data.message);
  };

  updateCevaplar = async (values: any) => {
    const data = await axios.put(
      `${url_dersler}/answers/update?answerID=${this.cevap.answerID}`,
      values
    );
    this.getCevaplar();
    runInAction(() => {
      this.cevap_update = false;
    });
    message.success(data.data.message);
  };
}

export default new GeneralStore();
