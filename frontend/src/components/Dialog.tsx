import dialogStyles from "./Dialog.module.css";

function Dialog({refDialog} : {refDialog: React.RefObject<HTMLDialogElement>}) {
  return (

     <dialog ref={refDialog} className={`${dialogStyles["dialog"]}`}>
     <form className={`${dialogStyles["form"]}`}>
       <div className={`${dialogStyles["inputs"]}`}>
         <label htmlFor="query">
           Search
           <input type="text" id="query" />
         </label>
         <label htmlFor="limit">
           Limit
           <input type="number" id="limit" />
         </label>
       </div>

       <div className={`${dialogStyles["buttons-container"]}`}>
         <button type="submit" formMethod="dialog">
           Cancel
         </button>
         <button type="submit">Filter</button>
       </div>
     </form>
   </dialog>

  )
}

export default Dialog