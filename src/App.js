import React, {useState, useEffect} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import useStyles from './styles.js';

import NewsCards from "./components/NewsCards/NewsCards";

const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    const classes= useStyles();

    useEffect(() => {
        alanBtn({
            key: '781850a6b72e538fbd5d3544e3631a7e2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command, articles, number}) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle +1);
                } else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number),{fuzzy: true}) : number;
                    const article = articles[parsedNumber -1];
                    
                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                     } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('Please try that again...');
                    }
                }
            },
        });
    },[]);

    return(
        <div>
            <div className={classes.logoContainer}>
                <img src="https://i.ibb.co/qygzDzL/Alan.png" className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}

export default App;
// return (
//     <div>
//       <div className={classes.logoContainer}>
//         {newsArticles.length ? (
//           <div className={classes.infoContainer}>
//             <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
//             <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
//           </div>
//         ) : null}
//         <img src="https://i.ibb.co/qygzDzL/Alan.png" className={classes.alanLogo} alt="logo" />
//       </div>
//       <NewsCards articles={newsArticles} activeArticle={activeArticle} />
//     </div>
// )};

// export default App;