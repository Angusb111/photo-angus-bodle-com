function Button1({ text, onClick }) {

  return (
      <button onClick={onClick} className="rounded-full bg-green-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-cyan-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">
        {text}
      </button>
  )
}

export default Button1