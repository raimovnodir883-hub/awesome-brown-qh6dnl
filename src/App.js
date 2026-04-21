import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  Linking,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  bg: "#07111F",
  card: "#0D1B2A",
  card2: "#10253B",
  primary: "#3AA6FF",
  primarySoft: "#7BC3FF",
  accent: "#18D1B5",
  white: "#F7FBFF",
  text: "#D7E7F5",
  subtext: "#94AFC4",
  border: "rgba(255,255,255,0.08)",
  danger: "#FF6B6B",
  warning: "#FFC857",
  success: "#35D49A",
};

const COURSE_OPTIONS = [
  { id: 1, title: "1-kurs" },
  { id: 2, title: "2-kurs" },
  { id: 3, title: "3-kurs" },
  { id: 4, title: "4-kurs" },
  { id: 5, title: "5-kurs" },
  { id: 6, title: "6-kurs" },
];

const SUBJECTS_BY_COURSE = {
  "1-kurs": [
    {
      id: 1,
      title: "Anatomiya",
      topics: [
        {
          id: 1,
          title: "Yurak anatomiyasi",
          fullTheory:
            "Yurak ko‘krak qafasining o‘rta mediastinum qismida joylashgan muskulli organ bo‘lib, qon aylanishini ta’minlaydi. U 4 kameradan iborat: o‘ng bo‘lmacha, o‘ng qorincha, chap bo‘lmacha va chap qorincha. Yurak devori endokard, miokard va epikarddan tashkil topgan.",
          simpleTheory:
            "Yurak qonni haydaydigan muskulli organ. U 4 bo‘limdan iborat va organizm bo‘ylab qon aylanishini ta’minlaydi.",
          audio: { title: "Yurak anatomiyasi audio", duration: "04:20" },
          video: {
            title: "Yurak anatomiyasi video",
            duration: "08:40",
            url: "https://www.youtube.com/watch?v=O8M8fVx-0jA",
          },
          test: {
            title: "Yurak anatomiyasi testi",
            questions: [
              {
                id: 1,
                question: "Yurak nechta kameradan iborat?",
                options: ["2", "3", "4", "5"],
                correct: 2,
              },
              {
                id: 2,
                question: "Yurak qaysi sohada joylashgan?",
                options: [
                  "Chanoq",
                  "Mediastinum",
                  "Qorin bo‘shlig‘i",
                  "Bosh qutisi",
                ],
                correct: 1,
              },
            ],
          },
          clinicalCase: {
            title: "Klinik case: Ko‘krak og‘rig‘i va EKG",
            patient:
              "Bemor 52 yosh, ko‘krak sohasida siquvchi og‘riq, hansirash va holsizlikdan shikoyat qiladi.",
            task: "Berilgan EKG va klinik belgilar asosida ehtimoliy tashxisni yozing.",
            visualType: "EKG",
            visualTitle: "EKG natijasi",
            imageUrl:
              "https://commons.wikimedia.org/wiki/Special:FilePath/ST%20elevation%20myocardial%20infarction%20ECG%20%28cropped%29.jpg",
            visualData: [
              { label: "Sinus ritm", status: "normal" },
              { label: "ST segment ko‘tarilishi", status: "abnormal" },
              { label: "II, III, aVF da o‘zgarish", status: "abnormal" },
            ],
            hint: "Ko‘krak og‘rig‘i + ST ko‘tarilishi bo‘lsa yurak mushagi ishemiyasi haqida o‘ylang.",
            expectedKeywords: ["miokard infarkt", "infarkt", "stemi"],
            feedback:
              "Bu holat o‘tkir pastki devor miokard infarktiga mos keladi. EKGdagi ST ko‘tarilishi va tipik ko‘krak og‘rig‘i tashxis uchun muhim.",
          },
        },
        {
          id: 2,
          title: "O‘pka anatomiyasi",
          fullTheory:
            "O‘pka nafas tizimining asosiy organi bo‘lib, gaz almashinuvida qatnashadi. O‘ng o‘pka 3 bo‘lak, chap o‘pka 2 bo‘lakdan iborat. Bronxlar tarmoqlanib bronxiolalar va alveolalarga o‘tadi.",
          simpleTheory:
            "O‘pka nafas olish uchun kerak. O‘ng o‘pka 3 bo‘lak, chap o‘pka 2 bo‘lakdan iborat.",
          audio: { title: "O‘pka anatomiyasi audio", duration: "03:55" },
          video: {
            title: "O‘pka anatomiyasi video",
            duration: "09:10",
            url: "https://www.youtube.com/watch?v=bHZsvBdUC2I",
          },
          test: {
            title: "O‘pka anatomiyasi testi",
            questions: [
              {
                id: 1,
                question: "O‘ng o‘pka nechta bo‘lakdan iborat?",
                options: ["1", "2", "3", "4"],
                correct: 2,
              },
            ],
          },
          clinicalCase: {
            title: "Klinik case: Pnevmoniya va rentgen",
            patient:
              "Bemor 34 yosh, isitma, yo‘tal, balg‘am va ko‘krakda og‘riqdan shikoyat qiladi.",
            task: "Rentgen tavsifi va klinik belgilarga asoslanib tashxis qo‘ying.",
            visualType: "Rentgen",
            visualTitle: "Ko‘krak qafasi rentgen tavsifi",
            imageUrl:
              "https://commons.wikimedia.org/wiki/Special:FilePath/Pneumonia%20x%20ray.jpg",
            visualData: [
              {
                label: "O‘ng pastki bo‘lakda infiltrativ soya",
                status: "abnormal",
              },
              { label: "Bronxovaskulyar chizma kuchaygan", status: "abnormal" },
              { label: "Plevral suyuqlik aniqlanmadi", status: "normal" },
            ],
            hint: "Isitma, yo‘tal va rentgendagi infiltrat birga kelsa pnevmoniya ehtimoli yuqori.",
            expectedKeywords: ["pnevmoniya"],
            feedback:
              "To‘g‘ri yo‘nalish: bu o‘ng pastki bo‘lak pnevmoniyasiga mos keladi. Rentgendagi infiltrat va klinik simptomlar asosiy mezon hisoblanadi.",
          },
        },
      ],
    },
    {
      id: 2,
      title: "Fiziologiya",
      topics: [
        {
          id: 1,
          title: "Nafas fiziologiyasi",
          fullTheory:
            "Nafas fiziologiyasi ventilyatsiya, diffuziya, perfuziya va gaz almashinuvi jarayonlarini o‘rganadi. Tashqi nafas, alveolyar gaz almashinuvi va nafas markazi boshqaruvi muhim o‘rin tutadi.",
          simpleTheory:
            "Nafas fiziologiyasi havo kirishi, chiqishi va kislorod almashinuvini o‘rgatadi.",
          audio: { title: "Nafas fiziologiyasi audio", duration: "05:00" },
          video: {
            title: "Nafas fiziologiyasi video",
            duration: "07:45",
            url: "https://www.youtube.com/watch?v=hp-gCvW8PRY",
          },
          test: {
            title: "Nafas fiziologiyasi testi",
            questions: [
              {
                id: 1,
                question: "Gaz almashinuvi asosan qayerda bo‘ladi?",
                options: ["Traxeya", "Bronx", "Alveola", "Plevra"],
                correct: 2,
              },
            ],
          },
          clinicalCase: {
            title: "Klinik case: Gipoksiya",
            patient:
              "Bemor hansirash, lablar ko‘karishi va tez nafas olishdan shikoyat qiladi.",
            task: "Klinik ma’lumot va qon gazlari tahliliga qarab ehtimoliy holatni ayting.",
            visualType: "Laboratoriya",
            visualTitle: "Arterial qon gazlari",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Blood_gas_analyzer.jpg/640px-Blood_gas_analyzer.jpg",
            visualData: [
              { label: "PaO2 pasaygan", status: "abnormal" },
              { label: "SaO2 pasaygan", status: "abnormal" },
              { label: "Nafas tezligi oshgan", status: "abnormal" },
            ],
            hint: "Kislorod ko‘rsatkichlari pasaygan bo‘lsa gipoksiya yoki nafas yetishmovchiligi haqida o‘ylang.",
            expectedKeywords: ["gipoksiya", "nafas yetishmovchiligi"],
            feedback:
              "Berilgan ma’lumotlar gipoksiya va nafas yetishmovchiligi tomonga olib keladi.",
          },
        },
      ],
    },
  ],
  "2-kurs": [
    {
      id: 1,
      title: "Patofiziologiya",
      topics: [
        {
          id: 1,
          title: "Yallig‘lanish",
          fullTheory:
            "Yallig‘lanish — to‘qimalarning shikastlanishga nisbatan himoya-moslashuv reaksiyasi bo‘lib, alteratsiya, ekssudatsiya va proliferatsiya bosqichlarini o‘z ichiga oladi.",
          simpleTheory:
            "Yallig‘lanish — organizmning zararli omillarga qarshi javobi.",
          audio: { title: "Yallig‘lanish audio", duration: "04:15" },
          video: {
            title: "Yallig‘lanish video",
            duration: "08:30",
            url: "https://www.youtube.com/watch?v=1xgQG5UuG8Y",
          },
          test: {
            title: "Yallig‘lanish testi",
            questions: [
              {
                id: 1,
                question: "Yallig‘lanishning klassik belgilaridan biri qaysi?",
                options: [
                  "Qizarish",
                  "Soch oqarishi",
                  "Uyquchanlik",
                  "Ko‘rish pasayishi",
                ],
                correct: 0,
              },
            ],
          },
          clinicalCase: {
            title: "Klinik case: O‘tkir yallig‘lanish",
            patient:
              "Bemorning qo‘lida og‘riq, qizarish, shish va issiqlik aniqlanadi.",
            task: "Klinik belgilarga asoslanib jarayonning turini yozing.",
            visualType: "Fizik ko‘rik",
            visualTitle: "Ko‘rik ma’lumotlari",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Cellulitis2.jpg/640px-Cellulitis2.jpg",
            visualData: [
              { label: "Qizarish bor", status: "abnormal" },
              { label: "Mahalliy harorat oshgan", status: "abnormal" },
              { label: "Shish aniqlanadi", status: "abnormal" },
              { label: "Og‘riq mavjud", status: "abnormal" },
            ],
            hint: "Qizarish, shish, og‘riq va issiqlik — o‘tkir yallig‘lanishning klassik belgilaridir.",
            expectedKeywords: [
              "yallig‘lanish",
              "otkir yallig'lanish",
              "o‘tkir yallig‘lanish",
            ],
            feedback:
              "To‘g‘ri: bu o‘tkir yallig‘lanishning tipik lokal belgilari.",
          },
        },
      ],
    },
    {
      id: 2,
      title: "Farmakologiya",
      topics: [
        {
          id: 1,
          title: "Antibiotiklar",
          fullTheory:
            "Antibiotiklar bakterial infeksiyalarni davolashda ishlatiladi. Ularning ta’sir mexanizmi hujayra devori sintezi, oqsil sintezi, nuklein kislota almashinuvi yoki metabolik yo‘llarni bloklashga asoslanadi.",
          simpleTheory:
            "Antibiotiklar bakteriyalarga qarshi ishlatiladigan dorilar.",
          audio: { title: "Antibiotiklar audio", duration: "05:30" },
          video: {
            title: "Antibiotiklar video",
            duration: "09:25",
            url: "https://www.youtube.com/watch?v=plVk4NVIUh8",
          },
          test: {
            title: "Antibiotiklar testi",
            questions: [
              {
                id: 1,
                question: "Antibiotiklar asosan nimaga qarshi ishlatiladi?",
                options: ["Virus", "Bakteriya", "Travma", "O‘sma"],
                correct: 1,
              },
            ],
          },
          clinicalCase: {
            title: "Klinik case: Bakterial infeksiya",
            patient:
              "Bemor yuqori isitma, yiringli balg‘am va leykotsitoz bilan murojaat qildi.",
            task: "Klinik ma’lumotlarga asoslanib qaysi turdagi terapiya o‘ylab ko‘riladi?",
            visualType: "Laboratoriya",
            visualTitle: "Qon tahlili",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Blood_smear.jpg/640px-Blood_smear.jpg",
            visualData: [
              { label: "Leykotsitlar oshgan", status: "abnormal" },
              { label: "Neytrofilyoz bor", status: "abnormal" },
              { label: "CRP yuqori", status: "abnormal" },
            ],
            hint: "Yiringli balg‘am va neytrofillar ko‘payishi bakterial etiologiyani ko‘rsatadi.",
            expectedKeywords: ["antibiotik", "antibakterial"],
            feedback:
              "Bu holatda bakterial infeksiya ehtimoli yuqori, shuning uchun antibakterial terapiya ko‘rib chiqiladi.",
          },
        },
      ],
    },
  ],
  "3-kurs": [
    {
      id: 1,
      title: "Ichki kasalliklar propedevtikasi",
      topics: [
        {
          id: 1,
          title: "Auskultatsiya asoslari",
          fullTheory:
            "Auskultatsiya ichki a’zolar faoliyati paytida yuzaga keladigan tovushlarni eshitib baholash usulidir. Yurak tonlari, o‘pka tovushlari va qo‘shimcha shovqinlar klinik ahamiyatga ega.",
          simpleTheory:
            "Auskultatsiya — stetoskop yordamida ichki tovushlarni eshitish usuli.",
          audio: { title: "Auskultatsiya audio", duration: "04:05" },
          video: {
            title: "Auskultatsiya video",
            duration: "07:50",
            url: "https://www.youtube.com/watch?v=Y3m2T4eNqVY",
          },
          test: {
            title: "Auskultatsiya testi",
            questions: [
              {
                id: 1,
                question: "Auskultatsiya uchun asosan nima ishlatiladi?",
                options: ["Stetoskop", "Termometr", "Shprits", "Mikroskop"],
                correct: 0,
              },
            ],
          },
          clinicalCase: {
            title: "Klinik case: O‘pka auskultatsiyasi",
            patient:
              "Bemor yo‘tal va nafas qisilishi bilan kelgan. Auskultatsiyada nam xirillash eshitiladi.",
            task: "Bu ko‘rsatkichlar qaysi nafas tizimi kasalligiga mos kelishi mumkin?",
            visualType: "Fizik ko‘rik",
            visualTitle: "Auskultativ topilma",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Stethoscope-2.png/640px-Stethoscope-2.png",
            visualData: [
              { label: "Nafas tovushi susaygan", status: "abnormal" },
              { label: "Nam xirillashlar bor", status: "abnormal" },
              {
                label: "Perkussiyada mahalliy o‘zgarish mumkin",
                status: "abnormal",
              },
            ],
            hint: "Nam xirillashlar va nafas qisilishi bronx-o‘pka kasalliklariga xos.",
            expectedKeywords: ["pnevmoniya", "bronxit"],
            feedback:
              "Bu topilmalar bronxit yoki pnevmoniya tomon yo‘naladi, keyingi tekshiruvlar bilan aniqlashtiriladi.",
          },
        },
      ],
    },
  ],
  "4-kurs": [
    {
      id: 1,
      title: "Terapiya",
      topics: [
        {
          id: 1,
          title: "Arterial gipertenziya",
          fullTheory:
            "Arterial gipertenziya — arterial bosimning doimiy ko‘tarilishi bilan xarakterlanuvchi holat. U yurak-qon tomir asoratlari xavfini oshiradi.",
          simpleTheory:
            "Arterial gipertenziya — qon bosimining yuqori bo‘lishi.",
          audio: { title: "Gipertenziya audio", duration: "05:25" },
          video: {
            title: "Gipertenziya video",
            duration: "10:05",
            url: "https://www.youtube.com/watch?v=K1M3S8gV5JQ",
          },
          test: {
            title: "Gipertenziya testi",
            questions: [
              {
                id: 1,
                question: "Arterial gipertenziya nimani bildiradi?",
                options: [
                  "Qon bosimining yuqori bo‘lishi",
                  "Harorat pasayishi",
                  "Qon shakarining kamayishi",
                  "Ko‘rish o‘tkirligi oshishi",
                ],
                correct: 0,
              },
            ],
          },
          clinicalCase: {
            title: "Klinik case: Qon bosimi yuqori",
            patient:
              "Bemor bosh og‘rig‘i va quloqda shovqin bilan kelgan. Qon bosimi 170/100 mm sim. ust.",
            task: "Klinik ma’lumotga asoslanib ehtimoliy tashxisni yozing.",
            visualType: "Vital signs",
            visualTitle: "Hayotiy ko‘rsatkichlar",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sphygmomanometer.jpg/640px-Sphygmomanometer.jpg",
            visualData: [
              { label: "Qon bosimi: 170/100", status: "abnormal" },
              { label: "Puls: 92/min", status: "normal" },
              { label: "Bosh og‘rig‘i mavjud", status: "abnormal" },
            ],
            hint: "Qon bosimi me’yordan ancha yuqori bo‘lsa arterial gipertenziya haqida o‘ylang.",
            expectedKeywords: ["gipertenziya", "arterial gipertenziya"],
            feedback:
              "To‘g‘ri yo‘nalish: bu arterial gipertenziyaga mos keladi.",
          },
        },
      ],
    },
  ],
  "5-kurs": [
    {
      id: 1,
      title: "Jarrohlik",
      topics: [
        {
          id: 1,
          title: "O‘tkir appenditsit",
          fullTheory:
            "O‘tkir appenditsit — chuvalchangsimon o‘simtaning o‘tkir yallig‘lanishi bo‘lib, shoshilinch jarrohlik holatlaridan biridir.",
          simpleTheory: "O‘tkir appenditsit — appendiksning yallig‘lanishi.",
          audio: { title: "Appenditsit audio", duration: "05:10" },
          video: {
            title: "Appenditsit video",
            duration: "09:40",
            url: "https://www.youtube.com/watch?v=2cO2XrM0v7M",
          },
          test: {
            title: "Appenditsit testi",
            questions: [
              {
                id: 1,
                question:
                  "O‘tkir appenditsit qaysi sohada og‘riq berishi mumkin?",
                options: [
                  "O‘ng pastki qorin",
                  "Chap qo‘l",
                  "Bo‘yin orqasi",
                  "Tovon",
                ],
                correct: 0,
              },
            ],
          },
          clinicalCase: {
            title: "Klinik case: O‘ng pastki qorin og‘rig‘i",
            patient:
              "Bemor ko‘ngil aynishi, isitma va o‘ng pastki qorin sohasida og‘riq bilan murojaat qilgan.",
            task: "Berilgan belgilar asosida ehtimoliy tashxisni yozing.",
            visualType: "UTT",
            visualTitle: "Appendiks UTT tasviri",
            imageUrl:
              "https://commons.wikimedia.org/wiki/Special:FilePath/Appendicitis%20ultrasound.png",
            visualData: [
              {
                label: "O‘ng pastki qorin sohasida og‘riq",
                status: "abnormal",
              },
              { label: "Ko‘ngil aynishi", status: "abnormal" },
              { label: "Harorat oshishi", status: "abnormal" },
              {
                label: "UTT da yallig‘langan appendiksga xos ko‘rinish",
                status: "abnormal",
              },
            ],
            hint: "O‘ng pastki qorin og‘rig‘i va isitma bo‘lsa o‘tkir appenditsit ehtimoli kuchli.",
            expectedKeywords: [
              "appenditsit",
              "otkir appenditsit",
              "o‘tkir appenditsit",
            ],
            feedback:
              "To‘g‘ri yo‘nalish: bu o‘tkir appenditsitga mos klinik holat.",
          },
        },
      ],
    },
  ],
  "6-kurs": [
    {
      id: 1,
      title: "Klinik amaliyot",
      topics: [
        {
          id: 1,
          title: "Tez yordam baholashi",
          fullTheory:
            "Klinik amaliyotda ABC yondashuv, hayotiy ko‘rsatkichlarni baholash va shoshilinch yordam ko‘rsatish muhim o‘rin tutadi.",
          simpleTheory:
            "Tez yordam baholashda avval nafas, qon aylanishi va hush holati tekshiriladi.",
          audio: { title: "Tez yordam audio", duration: "04:50" },
          video: {
            title: "Tez yordam video",
            duration: "08:20",
            url: "https://www.youtube.com/watch?v=6jJrPq6Yk2Q",
          },
          test: {
            title: "Tez yordam testi",
            questions: [
              {
                id: 1,
                question: "Shoshilinch baholashda birinchi yondashuv qaysi?",
                options: ["ABC", "XYZ", "QRS", "LMN"],
                correct: 0,
              },
            ],
          },
          clinicalCase: {
            title: "Klinik case: Shoshilinch holat",
            patient:
              "Bemor hushsiz holatda olib kelingan. Nafasi notekis, puls zaif.",
            task: "Birinchi navbatdagi klinik yondashuvni ayting.",
            visualType: "Birlamchi baholash",
            visualTitle: "Shoshilinch ko‘rsatkichlar",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Resuscitation_dummy.jpg/640px-Resuscitation_dummy.jpg",
            visualData: [
              { label: "Nafas notekis", status: "abnormal" },
              { label: "Puls zaif", status: "abnormal" },
              { label: "Hush pasaygan", status: "abnormal" },
            ],
            hint: "Bemor og‘ir holatda bo‘lsa birinchi navbatda airway, breathing, circulation tekshiriladi.",
            expectedKeywords: ["abc", "nafas yo'li", "airway"],
            feedback:
              "To‘g‘ri yo‘nalish: birinchi navbatda ABC yondashuvi qo‘llanadi.",
          },
        },
      ],
    },
  ],
};

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [authMode, setAuthMode] = useState("login");

  const [user, setUser] = useState({
    fullName: "Nodir Raimov",
    email: "nodir@example.com",
    password: "123456",
    role: "Student",
    university: "Medical University",
    bio: "Future doctor | MEDSTUDIUM user",
  });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Student",
    university: "",
  });

  const [selectedTab, setSelectedTab] = useState("Home");
  const [activeFeature, setActiveFeature] = useState(null);
  const [screenStack, setScreenStack] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [selectedTest, setSelectedTest] = useState(null);
  const [testAnswers, setTestAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const [caseAnswer, setCaseAnswer] = useState("");
  const [caseFeedback, setCaseFeedback] = useState("");
  const [hintUsed, setHintUsed] = useState(false);

  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      role: "ai",
      text: "Salom, men MEDSTUDIUM AI assistantman. Tanlangan mavzu bo‘yicha savol yozing.",
    },
  ]);

  const [teacherLog, setTeacherLog] = useState([]);
  const [adminLog, setAdminLog] = useState([]);

  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [openedVideoId, setOpenedVideoId] = useState(null);

  const greeting = useMemo(() => {
    if (user.role === "Student") return "O‘qishni davom ettiring";
    if (user.role === "Teacher") return "Darslarni boshqaring";
    return "Platformani nazorat qiling";
  }, [user.role]);

  const currentSubjects = selectedCourse
    ? SUBJECTS_BY_COURSE[selectedCourse] || []
    : [];
  const currentTopics = selectedSubject ? selectedSubject.topics || [] : [];
  const currentCase = selectedTopic?.clinicalCase || null;

  const navigateTo = (feature) => {
    setScreenStack((prev) => [...prev, activeFeature]);
    setActiveFeature(feature);
  };

  const goBack = () => {
    if (screenStack.length === 0) {
      setActiveFeature(null);
      return;
    }
    const updated = [...screenStack];
    const prev = updated.pop();
    setScreenStack(updated);
    setActiveFeature(prev || null);
  };

  const handleAuth = () => {
    if (authMode === "register") {
      if (!form.fullName || !form.email || !form.password) {
        Alert.alert(
          "Xatolik",
          "Iltimos, barcha kerakli maydonlarni to‘ldiring."
        );
        return;
      }

      setUser({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
        university: form.university || "Medical University",
        bio: "MEDSTUDIUM foydalanuvchisi",
      });

      setSelectedTab("Home");
      setScreen("dashboard");
      return;
    }

    if (form.email === user.email && form.password === user.password) {
      setSelectedTab("Home");
      setScreen("dashboard");
    } else {
      Alert.alert("Login xatoligi", "Email yoki parol noto‘g‘ri.");
    }
  };

  const logout = () => {
    setScreen("welcome");
    setAuthMode("login");
    setSelectedTab("Home");
    setActiveFeature(null);
    setScreenStack([]);
    setSelectedCourse(null);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setSelectedTest(null);
    setTestAnswers({});
    setTestSubmitted(false);
    setCaseAnswer("");
    setCaseFeedback("");
    setHintUsed(false);
    setAiInput("");
    setPlayingAudioId(null);
    setOpenedVideoId(null);
    setForm({
      fullName: "",
      email: "",
      password: "",
      role: "Student",
      university: "",
    });
  };

  const renderRoleBadge = (role) => {
    const roleColors = {
      Student: "#3AA6FF",
      Teacher: "#18D1B5",
      Admin: "#FFC857",
    };

    return (
      <View
        style={[
          styles.roleBadge,
          { backgroundColor: roleColors[role] || COLORS.primary },
        ]}
      >
        <Text style={styles.roleBadgeText}>{role}</Text>
      </View>
    );
  };

  const RoleSelector = ({ value, onChange }) => (
    <View style={styles.roleSelectorWrap}>
      {["Student", "Teacher", "Admin"].map((role) => {
        const active = value === role;
        return (
          <TouchableOpacity
            key={role}
            style={[styles.roleBtn, active && styles.roleBtnActive]}
            onPress={() => onChange(role)}
          >
            <Text
              style={[styles.roleBtnText, active && styles.roleBtnTextActive]}
            >
              {role}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const QuickCard = ({ title, subtitle, icon, onPress }) => (
    <TouchableOpacity style={styles.quickCard} onPress={onPress}>
      <Text style={styles.quickIcon}>{icon}</Text>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const ProgressBar = ({ progress }) => (
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
    </View>
  );

  const getAiReply = (text) => {
    const q = text.toLowerCase();

    if (q.includes("pnevmoniya")) {
      return "Pnevmoniyada isitma, yo‘tal, balg‘am va rentgendagi infiltrat muhim belgilar hisoblanadi.";
    }
    if (q.includes("bronxit")) {
      return "Bronxitda yo‘tal va bronxlar yallig‘lanishi asosiy o‘rinda turadi. Klinik va auskultativ topilmalar muhim.";
    }
    if (q.includes("infarkt")) {
      return "Miokard infarktida ko‘krak og‘rig‘i va EKGdagi ST segment o‘zgarishlari muhim diagnostik belgilardir.";
    }
    if (q.includes("appenditsit")) {
      return "O‘tkir appenditsitda o‘ng pastki qorin og‘rig‘i, isitma va ko‘ngil aynishi uchrashi mumkin.";
    }
    if (selectedTopic?.title) {
      return `${selectedTopic.title} mavzusi bo‘yicha demo AI javobi: nazariya, test, audio, video va clinical case bloklarini ham ko‘rib chiqing.`;
    }
    return "Savol qabul qilindi. Avval kurs, fan va mavzu tanlasangiz javoblar yanada mos chiqadi.";
  };

  const openTopic = (topic) => {
    setSelectedTopic(topic);
    navigateTo("topicDashboard");
  };

  const openTest = (test) => {
    setSelectedTest(test);
    setTestAnswers({});
    setTestSubmitted(false);
    navigateTo("testDetail");
  };

  const submitTest = () => {
    setTestSubmitted(true);
  };

  const calculateScore = () => {
    if (!selectedTest) return 0;
    let score = 0;
    selectedTest.questions.forEach((q) => {
      if (testAnswers[q.id] === q.correct) score += 1;
    });
    return score;
  };

  const submitCase = () => {
    if (!currentCase || !caseAnswer.trim()) {
      Alert.alert("Xatolik", "Iltimos, javob yozing.");
      return;
    }

    const normalized = caseAnswer.toLowerCase();
    const matched = currentCase.expectedKeywords.some((k) =>
      normalized.includes(k)
    );

    if (matched) {
      setCaseFeedback("✅ " + currentCase.feedback);
    } else {
      setCaseFeedback("⚠️ AI feedback: " + currentCase.feedback);
    }
  };

  const sendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userMsg = { role: "user", text: aiInput };
    const aiMsg = { role: "ai", text: getAiReply(aiInput) };
    setAiMessages((prev) => [...prev, userMsg, aiMsg]);
    setAiInput("");
  };

  const toggleAudio = () => {
    if (!selectedTopic) return;
    const id = selectedTopic.title;
    if (playingAudioId === id) {
      setPlayingAudioId(null);
      Alert.alert("Audio", "Audio pauza qilindi.");
    } else {
      setPlayingAudioId(id);
      Alert.alert("Audio", `${selectedTopic.audio.title} ijro etilmoqda.`);
    }
  };

  const openVideo = async () => {
    if (!selectedTopic?.video?.url) return;
    setOpenedVideoId(selectedTopic.title);
    try {
      await Linking.openURL(selectedTopic.video.url);
    } catch (e) {
      Alert.alert("Video", "Video linkni ochib bo‘lmadi.");
    }
  };

  const handleTeacherAction = (tool) => {
    let result = "";
    switch (tool) {
      case "Talabalar faolligini kuzatish":
        result =
          "Bugun 126 talabadan 87 tasi platformaga kirgan. Eng faol fan: Farmakologiya.";
        break;
      case "Mavzu joylash":
        result = "Yangi mavzu muvaffaqiyatli joylandi.";
        break;
      case "Test yaratish":
        result = "Yangi test student paneliga ulandi.";
        break;
      case "Video/audio dars qo‘shish":
        result = "Video va audio darslar muvaffaqiyatli biriktirildi.";
        break;
      case "Klinik case tekshirish":
        result = "12 ta clinical case javobi tekshiruv uchun tayyor.";
        break;
      default:
        result = "Amal bajarildi.";
    }
    setTeacherLog((prev) => [result, ...prev]);
    Alert.alert("Teacher Panel", result);
  };

  const handleAdminAction = (tool) => {
    let result = "";
    switch (tool) {
      case "Barcha foydalanuvchilar statistikasi":
        result =
          "Jami foydalanuvchilar: 1248. Student: 1050. Teacher: 142. Admin: 56.";
        break;
      case "Eng ko‘p o‘rganilgan mavzular":
        result = "Top mavzular: Antibiotiklar, Pnevmoniya, O‘tkir appenditsit.";
        break;
      case "Reyting va faollik nazorati":
        result = "O‘rtacha platforma faolligi 87%.";
        break;
      case "Kontent moderatsiyasi":
        result = "3 ta kontent moderatsiya kutmoqda.";
        break;
      case "O‘qituvchi va talabalarni boshqarish":
        result = "2 ta yangi teacher account tasdiq kutmoqda.";
        break;
      default:
        result = "Admin amali bajarildi.";
    }
    setAdminLog((prev) => [result, ...prev]);
    Alert.alert("Admin Panel", result);
  };

  const renderStudentCourseSelection = () => (
    <>
      <View style={styles.heroCard}>
        <Text style={styles.heroMini}>STUDENT FLOW</Text>
        <Text style={styles.heroTitle}>Kursni tanlang</Text>
        <Text style={styles.heroText}>
          Tanlangan kurs asosida fanlar, keyin mavzular chiqadi.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Kurslar</Text>
      {COURSE_OPTIONS.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={styles.itemCard}
          onPress={() => {
            setSelectedCourse(course.title);
            setSelectedSubject(null);
            setSelectedTopic(null);
            navigateTo("subjectSelection");
          }}
        >
          <Text style={styles.itemTitle}>{course.title}</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
    </>
  );

  const renderSubjectSelection = () => (
    <>
      {renderBackHeader()}
      <View style={styles.heroCard}>
        <Text style={styles.heroMini}>TANLANGAN KURS</Text>
        <Text style={styles.heroTitle}>{selectedCourse}</Text>
        <Text style={styles.heroText}>Endi fan tanlang.</Text>
      </View>

      <Text style={styles.sectionTitle}>Fanlar</Text>
      {currentSubjects.map((subject) => (
        <TouchableOpacity
          key={subject.id}
          style={styles.itemCard}
          onPress={() => {
            setSelectedSubject(subject);
            setSelectedTopic(null);
            navigateTo("topicSelection");
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{subject.title}</Text>
            <Text style={styles.itemSub}>{selectedCourse} uchun fan</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
    </>
  );

  const renderTopicSelection = () => (
    <>
      {renderBackHeader()}
      <View style={styles.heroCard}>
        <Text style={styles.heroMini}>TANLANGAN FAN</Text>
        <Text style={styles.heroTitle}>{selectedSubject?.title}</Text>
        <Text style={styles.heroText}>Endi mavzuni tanlang.</Text>
      </View>

      <Text style={styles.sectionTitle}>Mavzular</Text>
      {currentTopics.map((topic) => (
        <TouchableOpacity
          key={topic.id}
          style={styles.itemCard}
          onPress={() => openTopic(topic)}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{topic.title}</Text>
            <Text style={styles.itemSub}>Mavzu kontenti mavjud</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
    </>
  );

  const renderTopicDashboard = () => (
    <>
      {renderBackHeader()}
      {selectedTopic && (
        <>
          <View style={styles.heroCard}>
            <Text style={styles.heroMini}>TANLANGAN MAVZU</Text>
            <Text style={styles.heroTitle}>{selectedTopic.title}</Text>
            <Text style={styles.heroText}>
              To‘liq nazariya, soddalashtirilgan nazariya, test, audio, video va
              clinical case mavjud.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Mavzu bo‘limlari</Text>
          <View style={styles.quickGrid}>
            <QuickCard
              title="To‘liq nazariya"
              subtitle="Batafsil tushuntirish"
              icon="📘"
              onPress={() => navigateTo("fullTheory")}
            />
            <QuickCard
              title="Soddalashtirilgan"
              subtitle="Qisqa va oson"
              icon="🧠"
              onPress={() => navigateTo("simpleTheory")}
            />
            <QuickCard
              title="Test"
              subtitle="Mavzu bo‘yicha"
              icon="📝"
              onPress={() => openTest(selectedTopic.test)}
            />
            <QuickCard
              title="Audio"
              subtitle="Play / Pause"
              icon="🎧"
              onPress={() => navigateTo("audio")}
            />
            <QuickCard
              title="Video"
              subtitle="YouTube demo"
              icon="🎥"
              onPress={() => navigateTo("video")}
            />
            <QuickCard
              title="Clinical Case"
              subtitle="Tashxis qo‘yish"
              icon="🩺"
              onPress={() => {
                setCaseAnswer("");
                setCaseFeedback("");
                setHintUsed(false);
                navigateTo("clinicalCase");
              }}
            />
          </View>

          <Text style={styles.sectionTitle}>Mavzu progress</Text>
          <View style={styles.lessonCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.lessonTitle}>{selectedTopic.title}</Text>
              <Text style={styles.lessonPercent}>74%</Text>
            </View>
            <ProgressBar progress={74} />
          </View>
        </>
      )}
    </>
  );

  const renderTeacherHome = () => (
    <>
      <View style={styles.heroCard}>
        <Text style={styles.heroMini}>TEACHER PANEL</Text>
        <Text style={styles.heroTitle}>{greeting}</Text>
        <Text style={styles.heroText}>
          Talabalar faolligi, darslar, testlar va clinical case’larni
          boshqaring.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>O‘qituvchi funksiyalari</Text>
      {[
        "Talabalar faolligini kuzatish",
        "Mavzu joylash",
        "Test yaratish",
        "Video/audio dars qo‘shish",
        "Klinik case tekshirish",
      ].map((tool, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemCard}
          onPress={() => handleTeacherAction(tool)}
        >
          <Text style={styles.itemTitle}>{tool}</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}

      {teacherLog.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Oxirgi teacher amallari</Text>
          {teacherLog.map((log, i) => (
            <View style={styles.logCard} key={i}>
              <Text style={styles.logText}>{log}</Text>
            </View>
          ))}
        </>
      )}
    </>
  );

  const renderAdminHome = () => (
    <>
      <View style={styles.heroCard}>
        <Text style={styles.heroMini}>ADMIN PANEL</Text>
        <Text style={styles.heroTitle}>{greeting}</Text>
        <Text style={styles.heroText}>
          Platforma statistikasi va nazorat funksiyalari.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Administrator funksiyalari</Text>
      {[
        "Barcha foydalanuvchilar statistikasi",
        "Eng ko‘p o‘rganilgan mavzular",
        "Reyting va faollik nazorati",
        "Kontent moderatsiyasi",
        "O‘qituvchi va talabalarni boshqarish",
      ].map((tool, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemCard}
          onPress={() => handleAdminAction(tool)}
        >
          <Text style={styles.itemTitle}>{tool}</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}

      {adminLog.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Oxirgi admin amallari</Text>
          {adminLog.map((log, i) => (
            <View style={styles.logCard} key={i}>
              <Text style={styles.logText}>{log}</Text>
            </View>
          ))}
        </>
      )}
    </>
  );

  const renderProfile = () => (
    <>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.fullName?.slice(0, 1)?.toUpperCase() || "U"}
          </Text>
        </View>

        <Text style={styles.profileName}>{user.fullName}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        {renderRoleBadge(user.role)}

        <View style={styles.profileInfoBlock}>
          <Text style={styles.profileLabel}>Universitet</Text>
          <Text style={styles.profileValue}>{user.university}</Text>
        </View>

        <View style={styles.profileInfoBlock}>
          <Text style={styles.profileLabel}>Bio</Text>
          <Text style={styles.profileValue}>{user.bio}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Chiqish</Text>
      </TouchableOpacity>
    </>
  );

  const renderBackHeader = () => (
    <View style={styles.sectionHeaderRow}>
      <TouchableOpacity onPress={goBack} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← Orqaga</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFullTheory = () => (
    <>
      {renderBackHeader()}
      {selectedTopic && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>
            {selectedTopic.title} — To‘liq nazariya
          </Text>
          <Text style={styles.detailText}>{selectedTopic.fullTheory}</Text>
        </View>
      )}
    </>
  );

  const renderSimpleTheory = () => (
    <>
      {renderBackHeader()}
      {selectedTopic && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>
            {selectedTopic.title} — Soddalashtirilgan nazariya
          </Text>
          <Text style={styles.detailText}>{selectedTopic.simpleTheory}</Text>
        </View>
      )}
    </>
  );

  const renderAudio = () => (
    <>
      {renderBackHeader()}
      {selectedTopic && (
        <>
          <Text style={styles.sectionTitle}>Audio dars</Text>
          <View style={styles.mediaCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{selectedTopic.audio.title}</Text>
              <Text style={styles.itemSub}>
                Davomiyligi: {selectedTopic.audio.duration}
              </Text>
              <Text style={styles.itemSub}>
                {selectedTopic.title} bo‘yicha audio dars
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.mediaBtn,
                playingAudioId === selectedTopic.title && styles.pauseBtn,
              ]}
              onPress={toggleAudio}
            >
              <Text style={styles.mediaBtnText}>
                {playingAudioId === selectedTopic.title ? "Pause" : "Play"}
              </Text>
            </TouchableOpacity>
          </View>

          {playingAudioId === selectedTopic.title ? (
            <View style={styles.resultBox}>
              <Text style={styles.resultSub}>Audio ijro etilmoqda.</Text>
            </View>
          ) : null}
        </>
      )}
    </>
  );

  const renderVideo = () => (
    <>
      {renderBackHeader()}
      {selectedTopic && (
        <>
          <Text style={styles.sectionTitle}>Video dars</Text>
          <View style={styles.mediaCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{selectedTopic.video.title}</Text>
              <Text style={styles.itemSub}>
                Davomiyligi: {selectedTopic.video.duration}
              </Text>
              <Text style={styles.itemSub}>YouTube demo video</Text>
            </View>

            <TouchableOpacity style={styles.mediaBtn} onPress={openVideo}>
              <Text style={styles.mediaBtnText}>Open</Text>
            </TouchableOpacity>
          </View>

          {openedVideoId === selectedTopic.title && (
            <View style={styles.resultBox}>
              <Text style={styles.resultSub}>
                Video ochildi: {selectedTopic.video.title}
              </Text>
            </View>
          )}
        </>
      )}
    </>
  );

  const renderTestDetail = () => (
    <>
      {renderBackHeader()}
      {selectedTest && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selectedTest.title}</Text>

          {selectedTest.questions.map((q, index) => (
            <View key={q.id} style={styles.questionCard}>
              <Text style={styles.questionTitle}>
                {index + 1}. {q.question}
              </Text>

              {q.options.map((option, optionIndex) => {
                const selected = testAnswers[q.id] === optionIndex;
                const showCorrect = testSubmitted && q.correct === optionIndex;
                const showWrong =
                  testSubmitted && selected && testAnswers[q.id] !== q.correct;

                return (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.optionBtn,
                      selected && styles.optionBtnSelected,
                      showCorrect && styles.optionBtnCorrect,
                      showWrong && styles.optionBtnWrong,
                    ]}
                    onPress={() => {
                      if (!testSubmitted) {
                        setTestAnswers((prev) => ({
                          ...prev,
                          [q.id]: optionIndex,
                        }));
                      }
                    }}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {!testSubmitted ? (
            <TouchableOpacity style={styles.primaryBtn} onPress={submitTest}>
              <Text style={styles.primaryBtnText}>Testni yakunlash</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>
                Natija: {calculateScore()} / {selectedTest.questions.length}
              </Text>
              <Text style={styles.resultSub}>Test logikasi ishlayapti.</Text>
            </View>
          )}
        </View>
      )}
    </>
  );

  const renderStatusBadge = (status) => (
    <View
      style={[
        styles.statusBadge,
        status === "normal" ? styles.statusNormal : styles.statusAbnormal,
      ]}
    >
      <Text style={styles.statusBadgeText}>
        {status === "normal" ? "Normal" : "Abnormal"}
      </Text>
    </View>
  );

  const renderClinicalCase = () => (
    <>
      {renderBackHeader()}
      {currentCase && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{currentCase.title}</Text>

          <Text style={styles.label}>Bemor haqida</Text>
          <Text style={styles.detailText}>{currentCase.patient}</Text>

          <Text style={styles.label}>Tashxis uchun vazifa</Text>
          <Text style={styles.detailText}>{currentCase.task}</Text>

          <Text style={styles.label}>
            {currentCase.visualType}: {currentCase.visualTitle}
          </Text>

          {currentCase.imageUrl ? (
            <Image
              source={{ uri: currentCase.imageUrl }}
              style={styles.caseImage}
              resizeMode="cover"
            />
          ) : null}

          <View style={styles.visualBox}>
            {currentCase.visualData.map((item, index) => (
              <View key={index} style={styles.visualItem}>
                <View style={styles.visualTopRow}>
                  <Text style={styles.visualText}>{item.label}</Text>
                  {renderStatusBadge(item.status)}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.hintRow}>
            <TouchableOpacity
              style={styles.hintBtn}
              onPress={() => setHintUsed((prev) => !prev)}
            >
              <Text style={styles.hintBtnText}>
                {hintUsed ? "Hintni yopish" : "AI hint"}
              </Text>
            </TouchableOpacity>
          </View>

          {hintUsed ? (
            <View style={styles.resultBox}>
              <Text style={styles.resultSub}>{currentCase.hint}</Text>
            </View>
          ) : null}

          <Text style={styles.label}>Talaba javobi</Text>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="Tashxisingizni yozing..."
            placeholderTextColor={COLORS.subtext}
            value={caseAnswer}
            onChangeText={setCaseAnswer}
          />

          <TouchableOpacity style={styles.primaryBtn} onPress={submitCase}>
            <Text style={styles.primaryBtnText}>AI feedback olish</Text>
          </TouchableOpacity>

          {caseFeedback ? (
            <View style={styles.resultBox}>
              <Text style={styles.resultSub}>{caseFeedback}</Text>
            </View>
          ) : null}
        </View>
      )}
    </>
  );

  const renderAiScreen = () => (
    <>
      {renderBackHeader()}
      <Text style={styles.sectionTitle}>AI Assistant</Text>

      <View style={styles.aiCard}>
        <ScrollView
          style={{ maxHeight: 420 }}
          showsVerticalScrollIndicator={false}
        >
          {aiMessages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.chatBubble,
                msg.role === "user" ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={styles.chatRole}>
                {msg.role === "user" ? "Siz" : "MEDSTUDIUM AI"}
              </Text>
              <Text style={styles.chatText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        <TextInput
          style={styles.aiInput}
          placeholder="Savolingizni yozing..."
          placeholderTextColor={COLORS.subtext}
          value={aiInput}
          onChangeText={setAiInput}
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={sendAiMessage}>
          <Text style={styles.primaryBtnText}>Yuborish</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderFeatureContent = () => {
    if (selectedTab === "Profile" && !activeFeature) return renderProfile();

    if (user.role === "Teacher" && !activeFeature) return renderTeacherHome();
    if (user.role === "Admin" && !activeFeature) return renderAdminHome();

    switch (activeFeature) {
      case "subjectSelection":
        return renderSubjectSelection();
      case "topicSelection":
        return renderTopicSelection();
      case "topicDashboard":
        return renderTopicDashboard();
      case "fullTheory":
        return renderFullTheory();
      case "simpleTheory":
        return renderSimpleTheory();
      case "audio":
        return renderAudio();
      case "video":
        return renderVideo();
      case "testDetail":
        return renderTestDetail();
      case "clinicalCase":
        return renderClinicalCase();
      case "ai":
        return renderAiScreen();
      default:
        return renderStudentCourseSelection();
    }
  };

  const renderRegisterLogin = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.authWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBrand}>
          <View style={styles.brandDot} />
          <Text style={styles.brand}>MEDSTUDIUM</Text>
        </View>

        <View style={styles.authHero}>
          <Text style={styles.authMini}>AI-powered Medical Education</Text>
          <Text style={styles.authTitle}>
            {authMode === "login" ? "Hisobga kirish" : "Ro‘yxatdan o‘tish"}
          </Text>
          <Text style={styles.authSubtitle}>
            Tibbiyot talabalari, o‘qituvchilar va administratorlar uchun yagona
            platforma.
          </Text>
        </View>

        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[
              styles.switchBtn,
              authMode === "login" && styles.switchBtnActive,
            ]}
            onPress={() => setAuthMode("login")}
          >
            <Text
              style={[
                styles.switchBtnText,
                authMode === "login" && styles.switchBtnTextActive,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchBtn,
              authMode === "register" && styles.switchBtnActive,
            ]}
            onPress={() => setAuthMode("register")}
          >
            <Text
              style={[
                styles.switchBtnText,
                authMode === "register" && styles.switchBtnTextActive,
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.authCard}>
          {authMode === "register" && (
            <TextInput
              placeholder="To‘liq ism"
              placeholderTextColor={COLORS.subtext}
              style={styles.input}
              value={form.fullName}
              onChangeText={(t) => setForm({ ...form, fullName: t })}
            />
          )}

          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.subtext}
            style={styles.input}
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Parol"
            placeholderTextColor={COLORS.subtext}
            style={styles.input}
            value={form.password}
            onChangeText={(t) => setForm({ ...form, password: t })}
            secureTextEntry
          />

          {authMode === "register" && (
            <>
              <TextInput
                placeholder="Universitet"
                placeholderTextColor={COLORS.subtext}
                style={styles.input}
                value={form.university}
                onChangeText={(t) => setForm({ ...form, university: t })}
              />

              <Text style={styles.roleTitle}>Rolni tanlang</Text>
              <RoleSelector
                value={form.role}
                onChange={(role) => setForm({ ...form, role })}
              />
            </>
          )}

          {authMode === "login" && (
            <>
              <Text style={styles.roleTitle}>Demo login uchun:</Text>
              <Text style={styles.demoText}>Email: {user.email}</Text>
              <Text style={styles.demoText}>Parol: {user.password}</Text>
            </>
          )}

          <TouchableOpacity style={styles.authBtn} onPress={handleAuth}>
            <Text style={styles.authBtnText}>
              {authMode === "login" ? "Kirish" : "Hisob yaratish"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderDashboard = () => {
    const title = activeFeature
      ? "Modul"
      : selectedTab === "Profile"
      ? "Profil"
      : "Bosh sahifa";

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerSub}>Salom, {user.fullName}</Text>
          </View>
          {renderRoleBadge(user.role)}
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 110 }}
          showsVerticalScrollIndicator={false}
        >
          {renderFeatureContent()}
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              setSelectedTab("Home");
              setActiveFeature(null);
              setScreenStack([]);
            }}
          >
            <Text
              style={[
                styles.navIcon,
                selectedTab === "Home" &&
                  !activeFeature &&
                  styles.navIconActive,
              ]}
            >
              ⌂
            </Text>
            <Text
              style={[
                styles.navText,
                selectedTab === "Home" &&
                  !activeFeature &&
                  styles.navTextActive,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              if (user.role === "Student" && selectedTopic) {
                navigateTo("ai");
              } else if (user.role !== "Student") {
                Alert.alert(
                  "AI",
                  "Teacher/Admin uchun bu demo sahifada alohida AI yo‘q."
                );
              } else {
                Alert.alert("Avval", "Oldin kurs, fan va mavzu tanlang.");
              }
            }}
          >
            <Text
              style={[
                styles.navIcon,
                activeFeature === "ai" && styles.navIconActive,
              ]}
            >
              🤖
            </Text>
            <Text
              style={[
                styles.navText,
                activeFeature === "ai" && styles.navTextActive,
              ]}
            >
              AI
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.centerFab}
            onPress={() => {
              if (user.role === "Student" && selectedTopic) {
                setCaseAnswer("");
                setCaseFeedback("");
                setHintUsed(false);
                navigateTo("clinicalCase");
              } else if (user.role !== "Student") {
                Alert.alert(
                  "Clinical Case",
                  "Teacher/Admin panel uchun alohida boshqaruv mavjud."
                );
              } else {
                Alert.alert("Avval", "Oldin kurs, fan va mavzu tanlang.");
              }
            }}
          >
            <Text style={styles.centerFabText}>＋</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              if (user.role === "Student" && selectedTopic) {
                openTest(selectedTopic.test);
              } else if (user.role !== "Student") {
                Alert.alert(
                  "Test",
                  "Bu tugma student flow uchun mo‘ljallangan."
                );
              } else {
                Alert.alert("Avval", "Oldin kurs, fan va mavzu tanlang.");
              }
            }}
          >
            <Text
              style={[
                styles.navIcon,
                activeFeature === "testDetail" && styles.navIconActive,
              ]}
            >
              ⌕
            </Text>
            <Text
              style={[
                styles.navText,
                activeFeature === "testDetail" && styles.navTextActive,
              ]}
            >
              Test
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              setSelectedTab("Profile");
              setActiveFeature(null);
              setScreenStack([]);
            }}
          >
            <Text
              style={[
                styles.navIcon,
                selectedTab === "Profile" &&
                  !activeFeature &&
                  styles.navIconActive,
              ]}
            >
              ☺
            </Text>
            <Text
              style={[
                styles.navText,
                selectedTab === "Profile" &&
                  !activeFeature &&
                  styles.navTextActive,
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  if (screen === "welcome") return renderRegisterLogin();
  return renderDashboard();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  authWrapper: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  topBrand: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    marginRight: 10,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  brand: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
  },
  authHero: {
    marginBottom: 24,
  },
  authMini: {
    color: COLORS.primarySoft,
    fontSize: 13,
    marginBottom: 10,
    letterSpacing: 0.7,
  },
  authTitle: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  authSubtitle: {
    color: COLORS.subtext,
    fontSize: 15,
    lineHeight: 22,
  },
  switchRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 18,
    padding: 6,
    marginBottom: 20,
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  switchBtnActive: {
    backgroundColor: COLORS.primary,
  },
  switchBtnText: {
    color: COLORS.subtext,
    fontWeight: "700",
  },
  switchBtnTextActive: {
    color: "#00121F",
  },
  authCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    backgroundColor: COLORS.card2,
    color: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 15,
  },
  roleTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 12,
  },
  roleSelectorWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 18,
  },
  roleBtn: {
    flex: 1,
    backgroundColor: COLORS.card2,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roleBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleBtnText: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 13,
  },
  roleBtnTextActive: {
    color: "#02131F",
  },
  demoText: {
    color: COLORS.subtext,
    marginBottom: 5,
    fontSize: 13,
  },
  authBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },
  authBtnText: {
    color: "#06202B",
    fontWeight: "800",
    fontSize: 16,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "800",
  },
  headerSub: {
    color: COLORS.subtext,
    marginTop: 4,
    fontSize: 14,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  roleBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  roleBadgeText: {
    color: "#04141F",
    fontWeight: "800",
    fontSize: 12,
  },
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 8,
    marginBottom: 22,
    overflow: "hidden",
  },
  heroMini: {
    color: COLORS.primarySoft,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroText: {
    color: COLORS.subtext,
    fontSize: 14,
    lineHeight: 21,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
    marginTop: 4,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
  },
  backBtn: {
    backgroundColor: COLORS.card2,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backBtnText: {
    color: COLORS.white,
    fontWeight: "700",
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  quickCard: {
    width: (width - 48) / 2,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  quickTitle: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 6,
  },
  quickSubtitle: {
    color: COLORS.subtext,
    fontSize: 12,
    lineHeight: 18,
  },
  lessonCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
  lessonTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  lessonPercent: {
    color: COLORS.accent,
    fontWeight: "800",
  },
  progressBarBg: {
    height: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  itemCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
    flex: 1,
  },
  itemSub: {
    color: COLORS.subtext,
    marginTop: 6,
    fontSize: 12,
  },
  chevron: {
    color: COLORS.subtext,
    fontSize: 24,
    marginLeft: 12,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarText: {
    color: "#02141F",
    fontWeight: "800",
    fontSize: 30,
  },
  profileName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  profileEmail: {
    color: COLORS.subtext,
    fontSize: 14,
    marginBottom: 10,
  },
  profileInfoBlock: {
    width: "100%",
    backgroundColor: COLORS.card2,
    borderRadius: 18,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  profileLabel: {
    color: COLORS.subtext,
    fontSize: 12,
    marginBottom: 6,
  },
  profileValue: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
  },
  logoutBtn: {
    backgroundColor: "rgba(255,107,107,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.20)",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 18,
    marginBottom: 16,
  },
  logoutText: {
    color: COLORS.danger,
    fontWeight: "800",
    fontSize: 15,
  },
  detailCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  detailTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  detailText: {
    color: COLORS.text,
    lineHeight: 23,
    fontSize: 14,
    marginBottom: 10,
  },
  label: {
    color: COLORS.primarySoft,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 6,
  },
  mediaCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mediaBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  pauseBtn: {
    backgroundColor: COLORS.warning,
  },
  mediaBtnText: {
    color: "#031824",
    fontWeight: "800",
  },
  questionCard: {
    backgroundColor: COLORS.card2,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },
  questionTitle: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 12,
    lineHeight: 22,
  },
  optionBtn: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(58,166,255,0.10)",
  },
  optionBtnCorrect: {
    borderColor: COLORS.success,
    backgroundColor: "rgba(53,212,154,0.12)",
  },
  optionBtnWrong: {
    borderColor: COLORS.danger,
    backgroundColor: "rgba(255,107,107,0.12)",
  },
  optionText: {
    color: COLORS.white,
    fontSize: 14,
  },
  primaryBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 6,
  },
  primaryBtnText: {
    color: "#03202C",
    fontWeight: "800",
    fontSize: 15,
  },
  resultBox: {
    backgroundColor: COLORS.card2,
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resultTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6,
  },
  resultSub: {
    color: COLORS.text,
    lineHeight: 21,
  },
  textArea: {
    backgroundColor: COLORS.card2,
    color: COLORS.white,
    minHeight: 120,
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    marginBottom: 14,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  aiCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  chatBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  aiBubble: {
    backgroundColor: COLORS.card2,
  },
  userBubble: {
    backgroundColor: "rgba(58,166,255,0.14)",
  },
  chatRole: {
    color: COLORS.primarySoft,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 4,
  },
  chatText: {
    color: COLORS.white,
    lineHeight: 20,
  },
  aiInput: {
    backgroundColor: COLORS.card2,
    color: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  caseImage: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginTop: 8,
    marginBottom: 14,
    backgroundColor: "#0a1622",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  visualBox: {
    backgroundColor: COLORS.card2,
    borderRadius: 16,
    padding: 14,
    marginTop: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  visualItem: {
    marginBottom: 10,
  },
  visualTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  visualText: {
    flex: 1,
    color: COLORS.text,
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statusNormal: {
    backgroundColor: "rgba(53,212,154,0.14)",
  },
  statusAbnormal: {
    backgroundColor: "rgba(255,107,107,0.14)",
  },
  statusBadgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "800",
  },
  hintRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  hintBtn: {
    backgroundColor: "rgba(255,200,87,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,200,87,0.25)",
  },
  hintBtnText: {
    color: COLORS.warning,
    fontWeight: "800",
  },
  logCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  logText: {
    color: COLORS.text,
    lineHeight: 20,
  },
  bottomNav: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 14,
    backgroundColor: "#0B1826",
    borderRadius: 24,
    height: 74,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 62,
  },
  navIcon: {
    color: COLORS.subtext,
    fontSize: 22,
    marginBottom: 3,
  },
  navIconActive: {
    color: COLORS.primary,
  },
  navText: {
    color: COLORS.subtext,
    fontSize: 11,
    fontWeight: "700",
  },
  navTextActive: {
    color: COLORS.primary,
  },
  centerFab: {
    width: 58,
    height: 58,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -26,
    borderWidth: 5,
    borderColor: COLORS.bg,
  },
  centerFabText: {
    color: "#03202C",
    fontSize: 30,
    fontWeight: "800",
    marginTop: -2,
  },
});
