import Link from 'next/link';

interface IProps {
  type: string;
  isDisabled: boolean;
  btnText: string;
  question: string;
  link: string;
  linkText: string;
}

const AuthButton = (props: IProps) => (
  <div className="text-center">
    <button type={props.type} className="btn btn-default btn-sm mb-3 btn-block" disabled={props.isDisabled}>
      {props.btnText}
    </button>
    <span className="small-link">{props.question} </span>
    <Link href={props.link}>
      <a className="small-link">{props.linkText}</a>
    </Link>
  </div>
);

AuthButton.defaultProps = {
  type: 'submit'
};

export default AuthButton;