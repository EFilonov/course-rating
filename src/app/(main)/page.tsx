
import NavigationBar from '@/app/(delete-this-and-modify-page.tsx)/NavigationBar';
import Htag from './../components/Htag/Htag';
import Button from './../components/Button/Button';
import P from './../components/P/P';
import Tag from './../components/Tag/Tag';
import RateStars from './../components/RateStars/RateStars';


import { useHttp } from '../hooks/useHttp';
import ThemeSwitch from '../(delete-this-and-modify-page.tsx)/ThemeSwitch';


const Page = async  ()  => {
    
    return (
        <>
         
          <h1>MainPage</h1>
          <ThemeSwitch />
        </>
    );

};

export default Page; 




//  const [rating, setRating] = useState(0);
            //  <NavigationBar />

            // <Htag tag='h1'>Hello, World!</Htag>
            // <Htag tag='h3'>Hello, World!</Htag>

            // <Button appearance='blue' arrow='right'>Click Me</Button>

            // <Button appearance='gray' arrow='down'>Click Me</Button>

            // <P className='large' fontSize='large' onClick={() => alert('large')}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, dolorem omnis explicabo aspernatur laboriosam architecto esse cum inventore debitis exercitationem ratione, tempora ex accusantium quam fugiat rem quia ullam earum?</P>
            // <P className='regular' onClick={() => alert('regular')}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, dolorem omnis explicabo aspernatur laboriosam architecto esse cum inventore debitis exercitationem ratione, tempora ex accusantium quam fugiat rem quia ullam earum?</P>
            // <P className='large' fontSize='small' onClick={() => alert('small')}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, dolorem omnis explicabo aspernatur laboriosam architecto esse cum inventore debitis exercitationem ratione, tempora ex accusantium quam fugiat rem quia ullam earum?</P>

            // <Tag size="small" color='ghost'>Ghost Tag</Tag>
            // <Tag size="small" color='red'>Gray Tag</Tag>
            // <Tag size="regular" color='grey'>Red Tag</Tag>
            // <Tag size="small" href='https://example.com' color='green'>Green Tag</Tag>
            // <Tag size="small" href='https://example.com' color='primary'>Green Tag</Tag>
            // <Tag size="small" color='green'>Green Tag</Tag>

            // {/* <RateStars setRating={setRating} rate={rating} isEditable /> */}

            // <p style={{ marginTop: '40px' }}>This is the main page of the application.</p>