Đối tượng sinh viên

student = {
    name: '',
    email: '',
    phone: '',
    gender: 1; // 1: Male, 2 Famale
}

### Danh sách
- Viết hàm hiển thị danh sách student
    Đọc 1 list student

    const students = [
        {
            name: 'Nguyễn a',
            email: '',
            phone: '',
            gender: 1; // 1: Male, 2 Famale
        },
        {
            name: '',
            email: '',
            phone: '',
            gender: 1; // 1: Male, 2 Famale
        }
    ]

    function renderListStudent(students) {
        let content = ``;
        
        students.forEach((student) => {
            content += `<tr>`
            content += `<td>${student.name}</td>`
            content += `<td>${student.email}</td>`
            content += `<td>${student.phone}</td>`
            content += `<td>${student.address}</td>`
            content += `</td>`
        })

        document.querySelector('#list-user').innerHTML = content
    }

    renderListStudent(students)

    <table border="1" width="800">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody id="list-user">
        </tbody>
    </table>

### Form thêm mới

document.querySelector('#btn-save').addEventListener('submit', function(e) {
    e.preventDefault()
    document.querySelector('#errorName').innerText = ''
    
    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value
    let email = document.querySelector('#email').value

    // Validate
    - name trống thông báo lỗi
    if (!name) {
        document.querySelector('#errorName').innerText = 'vui lòng nhập tên' 
    }

    if (name && email && address && phone && gender) {
        // Insert vào array
        students.push({
            name: name,
            email: email,
            phone: phone,
            gender: gender,
        })

        renderListStudent(students)
    }
})