export default function Button ({text, Onclick, ...props}) {
  return (
    <button className="button" onClick={Onclick} {...props}>{text}</button>
  );
}