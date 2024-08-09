// pagination.js
export const updatePagination = (totalItems, currentPage, itemsPerPage, callback) => {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = ``;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const createPageButton = (pageNum, text, isDisabled = false) => {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (isDisabled) li.classList.add('disabled');

        const a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = text;
        a.dataset.page = pageNum;
        li.appendChild(a);

        a.addEventListener('click', (e) => {
            e.preventDefault();
            callback(pageNum);
        });

        return li;
    };

    if (currentPage > 1) {
        pagination.appendChild(createPageButton(currentPage - 1, 'Previous'));
    } else {
        pagination.appendChild(createPageButton(currentPage, 'Previous', true));
    }

    for (let i = 1; i <= totalPages; i++) {
        pagination.appendChild(createPageButton(i, i, i === currentPage));
    }

    if (currentPage < totalPages) {
        pagination.appendChild(createPageButton(currentPage + 1, 'Next'));
    } else {
        pagination.appendChild(createPageButton(currentPage, 'Next', true));
    }
};
