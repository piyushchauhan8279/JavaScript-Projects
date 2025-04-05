document.addEventListener("DOMContentLoaded",()=>{
    // hold elements

    const expense_name=document.getElementById("expense-name")
    const expense_amount=document.getElementById("expense-amount")
    const add_expense_btn=document.getElementById("add-expense-btn")
    const items=document.getElementById("items")
    const total_amount=document.getElementById("total-amount")

    let expenses=JSON.parse(localStorage.getItem("expense")) || []

    // inside this array: objects :- name, amount, id

    expenses.forEach((expense)=>{
        renderExpenses(expense)
    })

    let totalAmount=calculateTotal()
    
    // add event listner on the add expense button:-

    add_expense_btn.addEventListener("click",(event)=>{
        event.preventDefault();
        
    const name_value=expense_name.value.trim()
    const amount_value=expense_amount.value.trim()

    if(name_value==="" || amount_value==="") return;

    const newExpenses={
        name:name_value,
        amount:amount_value,
        id:Date.now()
    }

    expenses.push(newExpenses);
    saveExpenses();
    renderExpenses(newExpenses);
    updateTotal()
    

    expense_name.value=""
    expense_amount.value=""
    })

    items.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            let btnId = parseInt(e.target.getAttribute("btn-id"));
            expenses = expenses.filter((expense) => btnId !== expense.id);
    
            saveExpenses();
            renderAllExpenses();
            updateTotal();
        }
    });
   
    function renderExpenses(expense){
        
        const li=document.createElement('li')
        li.innerHTML=`
        <div class="track"><span id="s1">Expense: ${expense.name}</span>
        <span id="s2"> Amount: ${expense.amount}<span>
        <button class="btn" btn-id="${expense.id}" >Remove</button> 
        </div>
        `

        items.appendChild(li)
        saveExpenses();
    }

    function saveExpenses(){
        localStorage.setItem("expense",JSON.stringify(expenses))
    }

    function calculateTotal(){
        // using reduce function
        return expenses.reduce((sum,exp)=>(sum+Number(exp.amount)),0)
    }

    function updateTotal(){
        totalAmount=calculateTotal()
        total_amount.textContent=`Total: ${totalAmount}`
    }

    function renderAllExpenses() {
        items.innerHTML = ""; // Clear the list
        expenses.forEach((expense) => renderExpenses(expense));
    }
})