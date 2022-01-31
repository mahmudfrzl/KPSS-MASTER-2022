import { makeAutoObservable, runInAction, toJS } from "mobx";
import axios from "axios";
import { Form, message } from "antd";
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
  img_id: number = 0;

  image_note: any = {};

  image_question: any = {};
  img_question_id: number = 0;

  description: any = {};
  answerSection:any = {};
  noteDescription:any = {};

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
    runInAction(() => {
      this.ders_create = false;
      this.image = {};
    });
    data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 
  };
  //http://localhost:8080/api/lessons/update?deleted=false&description=xcbvxcvb&lessonID=1&name=sdfzsdf&status=true
  updateDers = async (values: any) => {
    const fd = new FormData();
    this.image && fd.append("pictureURL ", this.image);

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
      this.image = {};
    });
    data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 
  };

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

  postKonu = async (values?: any,form?:any) => {
    const fd = new FormData();
    let image;
    console.log(this.image);

    fd.append("pictureURL", this.image);
    //  http://37.148.211.32:8080/api/subjects/create?isPremium=false&lessonID=1&name=sdf
    const data: any = await axios.post(
      `${url_dersler}/subjects/create?isPremium=${values.isPremium}&lessonID=${values.lessonID}&name=${values.name}`,
      fd
    );
    this.getKonu();
    runInAction(() => {
      this.konu_create = false;
      this.image = {};
    });
    data.data.success === true ? message.success("Yeni konu başarıyla kayd edildi") :  message.error(data.data.message) 
    form.setFieldsValue({pictureURL:"", name: "",isPremium:""})
  };

  updateKonu = async (values: any) => {
    const fd = new FormData();
    console.log(this.image);

    fd.append("pictureURL", this.image);
    const data: any = await axios.put(
      `${url_dersler}/subjects/update?deleted=${values.deleted.toString()}&isPremium=${values.isPremium.toString()}&lessonID=${
        values.lessonID
      }&name=${values.name}&status=${values.status.toString()}&subjectID=${
        this.konu.subjectID
      }`,
      fd
    );
    this.getKonu();
    runInAction(() => {
      this.konu_update = false;
      this.image = {};
    });     
     data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 
  };

  getTestler = async () => {
    try {
      const data = await axios.get(url_dersler + "/test/getAll");
      runInAction(() => {
        this.testler = data.data.data;
      });
    } catch (err) {
      if (err) {
        runInAction(() => (this.testler = []));
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
      this.image = {};

    });
    data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 
  };
  // http://localhost:8080/api/test/update?deleted=true&forIsClosedQuestions=true&name=sdgfsfd&status=true&subjectID=1&testID=1
  updateTest = async (values: any) => {
    const fd = new FormData();
    fd.append("picture-url", this.image);

    const data: any = await axios.put(
      `${url_dersler}/test/update?deleted=${values.deleted.toString()}&forIsClosedQuestions=${values.forIsClosedQuestions.toString()}
      &name=${values.name}&status=${values.status.toString()}&subjectID=${
        values.subjectID
      }&testID=${this.test.testID}`,
      fd
    );
    this.getTestler();
    runInAction(() => {
      this.test_update = false;
      this.image = {};
    });
    data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 
  };

  getNotlar = async () => {
    try {
      const data = await axios.get(url_dersler + "/notes/getAll");
      runInAction(() => {
        this.notlar = data.data.data;
      });
    } catch (err) {
      if (err) {
        runInAction(() => (this.notlar = []));
      }
    }
  };
  //http://37.148.211.32:8080/api/pictures/upload-photo-note?noteID=8
  postNote = async (values: any) => {
    const fd = new FormData();
    fd.append("pictureURL", this.image_note);
    values.noteDescription = this.noteDescription
    const data: any = await axios.post(`${url_dersler}/notes/create`, values);
    await axios.post(
      `http://37.148.211.32:8080/api/pictures/upload-photo-note?noteID=${data.data.data.noteID}`,
      fd
    );
    this.getNotlar();
    runInAction(() => {
      this.create_note = false;
      this.image_note = {};
    });
    data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 
  };

  updateNot = async (values: any) => {
    const data: any = await axios.put(
      `${url_dersler}/notes/update?noteID=${this.not.noteID}`,
      values
    );
    const fd = new FormData();
    fd.append("pictureURL", this.image_note);
    this.img_id !== 0 &&
      (await axios.put(
        `http://37.148.211.32:8080/api/pictures/update-photo-note?noteID=${this.not.noteID}&pictureID=${this.img_id}`,
        fd
      ));
    this.getNotlar();
    runInAction(() => {
      this.note_update = false;
      this.img_id = 0;
      this.image_note = {};
    });
    data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 
  };

  getSorular = async () => {
    try {
      const data = await axios.get(url_dersler + "/questions/getAll");
      runInAction(() => {
        this.sorular = data.data.data;
      });
    } catch (err) {
      if (err) {
        runInAction(() => (this.sorular = []));
      }
    }
  };
  //http://37.148.211.32:8080/api/pictures/upload-photo-question?questionID=1
  postSorular = async (values: any) => {
    console.log(values.description);
    const fd = new FormData();
    fd.append("pictureURL", this.image_question);
    values.description = this.description;
    
    console.log(values.description);

    const data: any = await axios.post(
      `${url_dersler}/questions/create`,
      values
    );
    await axios.post(
      `${url_dersler}/pictures/upload-photo-question?questionID=${data.data.data.questionID}`,
      fd
    );
    this.getSorular();
    runInAction(() => {
      this.create_soru = false;
      this.image_question = {};
      this.image = {};
    });
    data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 
  };
  //http://37.148.211.32:8080/api/pictures/update-photo-question?pictureID=1&questionID=1
  updateSorular = async (values: any) => {
    const data: any = await axios.put(
      `${url_dersler}/questions/update?questionID=${this.soru.questionID}`,
      values
    );
    const fd = new FormData();
    fd.append("pictureURL", this.image_question);
    this.img_question_id !== 0 &&
      (await axios.put(
        //?noteID=${this.not.noteID}&pictureID=${this.img_id},
        `http://37.148.211.32:8080/api/pictures/update-photo-question?pictureID=${this.img_question_id}&questionID=${this.soru.questionID}`,
        fd
      ));
    this.getSorular();
    runInAction(() => {
      this.question_update = false;
      this.img_question_id = 0;
      this.image = {};
      this.image_question = {};
    });
    data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 
  };

  getCevaplar = async () => {
    try {
      const data = await axios.get(url_dersler + "/answers/get-all");
      runInAction(() => {
        this.cevaplar = data.data.data;
      });
    } catch (err) {
      if (err) {
        runInAction(() => (this.cevaplar = []));
      }
    }
  };
  //http://localhost:8080/api/answers/create-with-close-question
  //http://localhost:8080/api/answers/create-with-open-question
  postCevap = async (values: any) => {
    // console.log(values.isClosed.toString());
    
      // console.log(d.isClosed.toString());
      values.answerSection = this.answerSection
  
        const data = await axios.post(
          url_dersler + "/answers",
          values
        );
        this.getCevaplar();
        runInAction(() => {
          this.cevap_create = false;
        });
        data.data.success === true ? message.success(data.data.message) :  message.error(data.data.message) 



       

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
