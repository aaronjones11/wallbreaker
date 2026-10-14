export const moments = [
['Michael Beasley','EFFORT','Iron sharpens iron','A theme of challenging one another to improve; exact source attribution requires verification.','Michael Beasley iron sharpens iron'],
['Kobe Bryant','CONSISTENCY',"Job’s not finished",'Staying focused after a major victory.','Kobe Bryant jobs not finished'],
['Ray Lewis','EFFORT','Effort is between you and you','Personal accountability and relentless effort.','Ray Lewis effort between you and you'],
['Nick Saban','MENTAL TOUGHNESS','The Process','Focus on the next action and the habits that lead to success.','Nick Saban the process'],
['Teddy Atlas','DISCOMFORT','We are firemen!','The Timothy Bradley corner speech.','Teddy Atlas we are firemen Bradley'],
['Erwin Smith','COURAGE','My soldiers, rage!','The final charge in Attack on Titan.','Erwin Smith final charge'],
['Naruto Uzumaki','RESILIENCE','Confronting Pain','A moment about suffering and choosing how to respond.','Naruto confronts Pain'],
['Mike Tyson','CONFIDENCE','I’m the best ever','Competitive self-belief.','Mike Tyson best ever'],
['Terence Crawford','DISCIPLINE','The Work Behind the Win','A theme about the training behind elite performance.','Terence Crawford training motivation'],
['Floyd Mayweather','DISCIPLINE','Hard work! Dedication!','A training-room mantra.','Floyd Mayweather hard work dedication'],
['Rocky Balboa','RESILIENCE','It ain’t about how hard you hit','A moment about moving forward after setbacks.','Rocky Balboa how hard you can get hit'],
['Dan Campbell','MENTAL TOUGHNESS','Biting kneecaps','Building a competitive culture.','Dan Campbell kneecaps speech'],
['Muhammad Ali','CONFIDENCE','I am the greatest!','The power of self-belief.','Muhammad Ali I am the greatest'],
['Eric Thomas','EFFORT','How bad do you want it?','Aligning ambition and action.','Eric Thomas how bad do you want it'],
['Rock Lee','CONSISTENCY','Hard Work vs. Genius','Persistence against natural ability.','Rock Lee Gaara'],
['Might Guy','COURAGE','The Eight Gates','A lifetime of training expressed in one moment.','Might Guy eight gates'],
['King Théoden','COURAGE','Ride for ruin!','The Ride of the Rohirrim.','Theoden ride of the Rohirrim'],
['Aragorn','COURAGE','For Frodo','The Black Gate.','Aragorn for Frodo'],
['Leonidas','COURAGE','This is Sparta!','Defiance against overwhelming odds.','300 this is Sparta'],
['Brian Dawkins','EFFORT','Weapon X','Intensity, leadership and effort.','Brian Dawkins motivational speech'],
['Kobe Bryant','DISCIPLINE','Five Airballs','Responding to failure through preparation.','Kobe Bryant five airballs'],
['Teddy Atlas','MENTAL TOUGHNESS','Strong for 15 Minutes','Finding strength when it matters.','Teddy Atlas strong for 15 minutes'],
['Nick Saban','CONSISTENCY','Win the Next Play','A process-focused theme, not a verified verbatim quotation.','Nick Saban next play process'],
['Naruto Uzumaki','COURAGE','Naruto vs. Neji','Defying expectations.','Naruto Neji speech'],
["Coach D’Amato",'EFFORT','The Inches Speech','Small choices determine the outcome.','Any Given Sunday inches speech']
].map(([name,category,quote,description,search],id)=>({
  id,name,category,quote,description,search,
  // Use only verified and cleared source content for full quote transcription.
  fullQuote: null,
  sourceUrl: null,
  portrait: null
}));
