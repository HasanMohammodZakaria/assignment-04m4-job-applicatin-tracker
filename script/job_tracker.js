// create variable
let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

// get all count 
let totalJobCount = document.getElementById('total-job-count');
let interviewJobCount = document.getElementById('interview-job-count');
let rejectJobCount = document.getElementById('rejected-job-count');
let availableJobs = document.getElementById('available-jobs');

// get all job cards 
const allJobCards = document.getElementById('all-cards-container');

// get filtered job cards 
const filteredJobCard = document.getElementById('filtered-job-cards');

// get main container
const mainContainer = document.querySelector('main');

// create all job count function

function jobTrackerCount() {
    totalJobCount.innerText = allJobCards.children.length;
    interviewJobCount.innerText = interviewList.length;
    rejectJobCount.innerText = rejectedList.length;
}

jobTrackerCount();

// job tracker toggle btn style (event delegation)

const jobTrackerBtnContainer = document.querySelector('.job-tracker-btn-container');
    jobTrackerBtnContainer.addEventListener('click', function(event) {
        const jobTrackerBtn = event.target.closest('button');

        if(!jobTrackerBtn){
            return;
        } 

        const buttons = jobTrackerBtnContainer.querySelectorAll('button');

        for(let button of buttons) {
            button.classList.remove('bg-[#3B82F6]','text-white');
            button.classList.add('bg-white','text-[#64748B]');
        }
        
        jobTrackerBtn.classList.remove('bg-white', 'text-[#64748B]');
        jobTrackerBtn.classList.add('bg-[#3B82F6]', 'text-white');

        currentStatus = jobTrackerBtn.id;
        
        if(currentStatus === 'interview-filter-btn') {
            allJobCards.classList.add('hidden');
            filteredJobCard.classList.remove('hidden');
            renderInterview();
        }else if(currentStatus === 'all-filter-btn') {
            allJobCards.classList.remove('hidden');
            filteredJobCard.classList.add('hidden');
        }else if(currentStatus === 'rejected-filter-btn') {
            allJobCards.classList.add('hidden');
            filteredJobCard.classList.remove('hidden');
            renderRejected();
        }
    });

    // create job card for filtering (event delegation)

    mainContainer.addEventListener('click', function(event) {

        const jobInterviewBtn = event.target.closest('.job-interview-btn');
        const jobRejectedBtn = event.target.closest('.job-rejected-btn');
        const deleteBtn = event.target.closest('.delete-btn');
        

        if(jobInterviewBtn) {
            const jobCard = event.target.closest('.card');

            const companyName = jobCard.querySelector('.company-name').innerText;
            const jobPosition = jobCard.querySelector('.job-position').innerText;
            const jobInfo = jobCard.querySelector('.job-info').innerText;
            const jobStatus = jobCard.querySelector('.job-status').innerText;
            const jobDescription = jobCard.querySelector('.job-description').innerText;

            jobCard.querySelector('.job-status').innerText = 'INTERVIEW';

            // create object 

            const jobCardInfo = {
                companyName,
                jobPosition,
                jobInfo,
                jobStatus: 'INTERVIEW',
                jobDescription
            }

            // check has job card in interviewList
            const hasJobCard = interviewList.find(item => item.companyName === jobCardInfo.companyName);

            if(!hasJobCard) {
                interviewList.push(jobCardInfo);
            }

            rejectedList = rejectedList.filter(item => item.companyName !== jobCardInfo.companyName);
            

            if(currentStatus === 'interview-filter-btn') {
                renderInterview();
            }else if(currentStatus === 'rejected-filter-btn') {
                renderRejected();
            }

            jobTrackerCount();
            
        
        }else if(jobRejectedBtn) {
            const jobCard = event.target.closest('.card');

            const companyName = jobCard.querySelector('.company-name').innerText;
            const jobPosition = jobCard.querySelector('.job-position').innerText;
            const jobInfo = jobCard.querySelector('.job-info').innerText;
            const jobStatus = jobCard.querySelector('.job-status').innerText;
            const jobDescription = jobCard.querySelector('.job-description').innerText;

            jobCard.querySelector('.job-status').innerText = 'REJECTED';

            // create object 

            const jobCardInfo = {
                companyName,
                jobPosition,
                jobInfo,
                jobStatus: 'REJECTED',
                jobDescription
            }

            // check has job card in rejectedList
            const hasJobCard = rejectedList.find(item => item.companyName === jobCardInfo.companyName);

            // check no duplicate card add again
            if(!hasJobCard) {
                rejectedList.push(jobCardInfo);
            }


            interviewList = interviewList.filter(item => item.companyName !== jobCardInfo.companyName);

            if(currentStatus === 'interview-filter-btn') {
                renderInterview();
            }else if(currentStatus === 'rejected-filter-btn') {
                renderRejected();
            }

            jobTrackerCount();

        }else if(deleteBtn) {
            const jobCard = deleteBtn.closest('.card');
            jobCard.remove();


            jobTrackerCount();
        }   
    });

    // job card rendering 

    function renderInterview() {
        filteredJobCard.innerHTML = '';

        const defaultTemplate = document.getElementById('default-template');

        if(interviewList.length === 0) {
            defaultTemplate.classList.remove('hidden');
        }else{
            defaultTemplate.classList.add('hidden');
        }
        

        for(let interview of interviewList) {
            let div = document.createElement('div');
            div.className = "card bg-white p-6 inset-shadow-2xs rounded-lg flex justify-between";

            div.innerHTML = `
                <div class="left-side">
                        <div class="mb-5">
                            <h3 class="company-name text-[18px] text-[#002C5C] font-medium mb-2">${interview.companyName}</h3>

                            <p class="job-position text-[#64748B] text-1rem ">${interview.jobPosition}</p>
                        </div>
                        <p class="job-info mb-5 text-[#64748B] text-[14px] ">${interview.jobInfo}</p>

                        <button class="job-status bg-[#EEF4FF] px-3 py-2 rounded-lg text-[14px] text-[#002C5C] font-medium mb-2 cursor-pointer">${interview.jobStatus}</button>

                        <p class="job-description text-[14px] text-[#323B49] mb-5">${interview.jobDescription}</p>

                        <div class="card-btn-container flex gap-2">
                            <button class="job-interview-btn border border-[#10B981] text-[#10B981] text-[14px] font-semibold rounded-lg px-3 py-2 cursor-pointer">INTERVIEW</button>

                            <button class="job-rejected-btn border border-[#EF4444] text-[#EF4444] text-[14px] font-semibold rounded-lg px-3 py-2 cursor-pointer">REJECTED</button>
                        </div>
                    </div>

                    <div class="right-side">
                       
                        <button class="delete-btn border border-gray-200 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"><i class="fa-regular fa-trash-can text-[14px] text-gray-400 "></i></button>

                    </div>
            `;

            filteredJobCard.appendChild(div);
            
        }

    }

    function renderRejected() {
        filteredJobCard.innerHTML = '';

        const defaultTemplate = document.getElementById('default-template');
        
        if(rejectedList.length === 0) {
             defaultTemplate.classList.remove('hidden');
        }else {
            defaultTemplate.classList.add('hidden');
        }

        for(let rejected of rejectedList) {
            let div = document.createElement('div');
            div.className = "card bg-white p-6 inset-shadow-2xs rounded-lg flex justify-between";

            div.innerHTML = `
                <div class="left-side">
                        <div class="mb-5">
                            <h3 class="company-name text-[18px] text-[#002C5C] font-medium mb-2">${rejected.companyName}</h3>

                            <p class="job-position text-[#64748B] text-1rem ">${rejected.jobPosition}</p>
                        </div>
                        <p class="job-info mb-5 text-[#64748B] text-[14px] ">${rejected.jobInfo}</p>

                        <button class="job-status bg-[#EEF4FF] px-3 py-2 rounded-lg text-[14px] text-[#002C5C] font-medium mb-2 cursor-pointer">${rejected.jobStatus}</button>

                        <p class="job-description text-[14px] text-[#323B49] mb-5">${rejected.jobDescription}</p>

                        <div class="card-btn-container flex gap-2">
                            <button class="job-interview-btn border border-[#10B981] text-[#10B981] text-[14px] font-semibold rounded-lg px-3 py-2 cursor-pointer">INTERVIEW</button>

                            <button class="job-rejected-btn border border-[#EF4444] text-[#EF4444] text-[14px] font-semibold rounded-lg px-3 py-2 cursor-pointer">REJECTED</button>
                        </div>
                    </div>

                    <div class="right-side">
                       
                        <button class="delete-btn border border-gray-200 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"><i class="fa-regular fa-trash-can text-[14px] text-gray-400 "></i></button>

                    </div>
            `;

            filteredJobCard.appendChild(div);
        }

        
    }

   

    

