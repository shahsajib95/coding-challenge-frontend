import Head from "next/head";
import Image from "next/image";
import FormControl from "../component/Form/Form";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
  const res = await data.json();
  return {
    props: {res}, // will be passed to the page component as props
  }
}

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>User Post Submit</title>
        <meta name="description" content="A task by Sud Goyal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FormControl user={props.res}/>
    </div>
  );
}
