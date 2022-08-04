/* -------------------------------------------------------------------------- //
this script is designed for a static webpage that plays a game of vet jeopardy.
it simply chains events together to go through the game phases. score-keeping
should be done by the host/teams, as it's too annoying to implement into the
board itself lol. the q/a's are hardcoded since its a static page.
----------------------------------------------------------------------------- */

function main() {

  // insert the titles into the title divs
  const titleDivs = document.querySelectorAll(".category-title");
  titleDivs.forEach((div,i) => {
    div.textContent = categoryTitles[i];
  });

  // gather up all the question divs and add click event listeners
  const questionDivs = document.querySelectorAll(".question");
  questionDivs.forEach(div => {
    div.addEventListener("click", questionClicked);
  });
}

// ensure that the DOM loads before we call our game script
document.addEventListener("DOMContentLoaded", main);

// helper functions (event listener callbacks) ------------------------------ //

// callback for when a question item is clicked
function questionClicked(evt) {

  // set the current question target to "cleared" i.e. off the board
  evt.target.classList.add("cleared");
  evt.target.removeEventListener("click", questionClicked);

  // create a div to be the question prompt displayed
  const div = document.createElement("div");
  div.classList.add("question-prompt");
  // with the appropriate question html as content
  const index = parseInt(evt.target.id)-1;
  let fontModifier = "";
  // if it's a long question, we decrease the question font-size
  if (questionArray[index].length > 200) fontModifier = ` style="font-size: 5vw" `
  if (questionArray[index].length > 300) fontModifier = ` style="font-size: 4vw" `
  div.innerHTML = `<p${fontModifier}>` + questionArray[index] + "</p>";

  // keep question # in div id information for answer # later
  div.setAttribute("id", index);
  // add the event listener for clicking on a prompt
  div.addEventListener("click", answerRequested, false);

  // fade the board out / fade the question in
  document.querySelector(".board").style.opacity = 0;
  document.documentElement.append(div);
  setTimeout(function(){
    document.querySelector(".question-prompt").style.opacity = 1;
  },500);

}

// callback for when the answer has been requested
function answerRequested(evt) {

  // pre-query useful DOM element
  const div = document.querySelector(".question-prompt");

  // fade question out
  document.querySelector(".question-prompt p").style.opacity = 0;


  // fade the answer in
  setTimeout(function(){
    const index = parseInt(div.id);
    const style = ` style="opacity: 0; color: yellow"`
    div.innerHTML = `<p ${style}>` + answerArray[index] + `</p>`;
    setTimeout(function(){
      document.querySelector(".question-prompt p").style.opacity = 1;
    }, 0);
  }, 500);


  // have question disappear on click
  div.addEventListener("click", promptComplete, false);

}

// callback for when a question prompt has been completed
function promptComplete(evt) {

  const div = document.querySelector(".question-prompt");

  // fade out the question prompt and in the board
  div.style.opacity = 0;
  setTimeout(function(){
    document.querySelector(".board").style.opacity = 1;
  }, 500);
  // remove the old question prompt (invisible) from the DOM
  setTimeout(function(){
    div.remove();
  }, 500);

}

// hard-coded q's and a's since this is a static web-page ------------------- //

const categoryTitles = [
  "General Knowledge",
  "Small Animal",
  "Analgesia and Pain",
  "Monitoring",
  "CPR",
  "Misc."
]

const questionArray = [
  // category: general knowledge -----------------------------------------------
  `This classification is given to each patient prior to anesthesia and
   may provide an estimate about the anticipated anesthetic risk of said patient
   regarding its physical status.`
   ,
  `This monitoring device allows for the confirmination of endotracheal
   intubation and is very valuable during CPR.`
   ,
  `This certain breed of larger animal species is very sensitive to anesthetic
   agents, especially alpha-2 agonists such as Xylazine.`
  ,
  `Benzodiazepines, Propofol, Etomidate, and Alfaxalone all work on this
   receptor as an agonist.`
  ,
  `Due to its depressing effects on the adrenal glands and possible accumulation,
   this drug should not be given as a CRI.`
  ,
  // category: small animal ----------------------------------------------------
  `This induction drug is an alternative to Ketamine for intramuscular
   sedation in small animals.`
  ,
  `You premedicated a two-year-old morbidly obese dog with Dexdomitor 5mcg/kg IM
   and butorphanol 0.2mg/kg IM for radiographs. The injection was done into the
   epaxial muscles, with a 22-gauge half-inch needle. After 20 minutes, no
   sedation is observed, meaning the adminsterer made this error.`
   ,
  `You are anesthetizing a two-year-old bulldog. The anesthesia was without
   complications. Twenty-four hours after, the owner calls you that the dog now
   has increased inspiratory effort; this is the most likely cause.`
  ,
  `You obtain the following blood gas values from a patient with a history of a
   liver tumor. The patient presented with vomiting and decreased appetite and
   the following blood gas abnormalities: <br/><span style="color: red">pH: 7.0,
   P<sub>a</sub>CO<sub>2</sub>: 40mmHg, HCO<sub>3</sub> 10mmol/L.</span>`
  ,
  `This nerve will block the soft and hard palate, canines, incisors,
   molars/premolars, and soft palate.`
  ,
  // category: analgesia and pain ----------------------------------------------
  `This pain assessment tool is validated for small animals (dogs) with
   acute post-surgical pain.`
  ,
  `A 18 year old m/n DSH cat is presented with a small intestinal obstructing
   foreign body. After a physical examination, you determine that the cat is
   approximately 10% dehydrated and depressed. These drugs should not be used
   for sedation / premedication.`
  ,
  `A horse is presented with cellulitis in the right hind leg. This phenomenon,
   associated with pain processing without analgesia, will occur <br/>
   within 24 hours.`
  ,
  `These four processes occur from initial trauma/insult to a sensed
   pain response.`
  ,
  `This is the only type of a pain that does not involve nociceptors.`
  ,
  // category: monitoring ------------------------------------------------------
  `This monitor detects the saturation of oxygenated hemoglobin.`
  ,
  `This capnography waveform could represent this (three possbilites).
   <br/><img src="./public/waveform.jpg"/>`
  ,
  `You are making a bet with a colleague about arterial partial pressure of
   CO<sub>2</sub>. The end-tidal CO<sub>2</sub> of an anesthetized dog is 45mmHg.
   This is a correct approximation for the arterial P<sub>a</sub>CO<sub>2</sub>:`
   ,
  `These two variables determine blood pressure.`
  ,
  `A healthy dog anesthetized for an orthopedic procedure is hypotensive and
   bradycardic. The end-tidal isoflurane concentration is 1.6%. You chose to
   administer atropine to treat the HR and the hypotension. Several minutes after
   administration HR and BP increase within normal limits, but now also the dog
   became light and the end-tidal isoflurane concentration dropped to 1.3%. Why?`
  ,
  // category: CPR -------------------------------------------------------------
  `Baby Shark, Stayin' Alive, and Another One Bites the Dust can all be used for
   this purpose during CPR.`
  ,
  `This drug can be used to treat ventricular tachycardia.`
  ,
  `This is the only monitor that can accurately assess quality of cardiac
   compressions and perfusion.`
  ,
  `This comprehensive guidline was developed in 2012 to aid veterinarians with
   the performance of CPR.`
  ,
  "Treatment for ventricular fibrillation requires this device."
  ,
  // category: miscellaneous ---------------------------------------------------
  `You are presented with a 7-year-old German Shepard. After physical exam and
   abdominal radiographs, a GDV is diagnosed. You also determine that the patient
   is significantly dehydrated, with an elevated heart rate of 140bpm, weak
   pulses, tacky mucous membranes, tachypnea (60 breaths per min) and hypotension
   (SAP 70 mmHg). This is the reason why.`
   ,
  `This drug can cause the following arrythmia in dogs.
   <br/><img src="./public/arrythmia.png"/>`
  ,
  `You have to amputate the first phalanx of the right-front-limb of a kitten
   and would like to use a local block (ring block) to provide adjunct analgesia.
   This local anesthetic would provide the longest lasting effect.`
  ,
  `These two variables determine cardiac output.`
  ,
  `This technique is used to intubate large ruminants.`
]

const answerArray = [
  // category: general knowledge -----------------------------------------------
  `What is ASA status?`
  ,
  `What is capnography?`
  ,
  `What is a Brahman?`
  ,
  `What is the GABBA receptor?`
  ,
  `What is Etomidate?`
  ,
  // category: small animal ----------------------------------------------------
  `What is Alfaxalone?`
  ,
  `What is intrafat injection / insufficient sedation?`
  ,
  `What is aspiration pneumonia? (Brachycephalic are of higher risk for
   regurgitation and aspiration at some point during anesthesia.)`
  ,
  `What is metabolic acidosis?`
  ,
  `What is a maxillary nerve block?`
  ,
  // category: analgesia and pain ----------------------------------------------
  `What is the Glasgow pain scale?`
  ,
  `What are acepromazine and alpha-2 agonists?`
  ,
  `What is wind-up pain?`
  ,
  `What is transduction, transmission, modulation, and perception?`
  ,
  `What is neuropathic pain?`
  ,
  // category: monitoring ------------------------------------------------------
  `What is the SpO<sub>2</sub> monitor?`
  ,
  `What is Curare cleft? <br/>
   What is bucking the ventilator? <br/>
   What is movement by the surgeon? <br/>`
  ,
  `What is 47-50 mmHg? <br/> (The arterial CO<sub>2</sub> should be 3-5 mmHg higher then the end-tidal.)`
  ,
  `What are cardiac output and systemic vascular resistance?`
  ,
  `What is increased cardiac output (increased perfusion of tissue and
   redistribution of isoflurane)?`
  ,
  // category: CPR -------------------------------------------------------------
  `What is the rate of cardiac compressions?`
  ,
  `What is lidocaine?`
  ,
  `What is a capnograph?`
  ,
  `What are the RECOVER guidelines?`
  ,
  `What is a defibrillator?`
  ,
  // category: miscellaneous ---------------------------------------------------
  `What is hypovolemic shock?`
  ,
  `What is dexmedetomidine or glycopyrrolate?`
  ,
  `What is bupivacaine?`
  ,
  `What are heart rate and stroke volume?`
  ,
  `What is blind intubation with digital palpation?`
]
