$.extend({
    index: {
        createLi() {
            $('.container').append(`
    <li>
        <span></span>. <input type="text"> 
        <button  class="del">-</button>
        <button  class="up">↑</button>
        <button  class="down">↓</button>
    </li>`)
        },

        reSort() {
            $('.up,.down').show()
            $('.up').first().hide()
            $('.down').last().hide()

            let code = 'ABCDEFGHIJKLMN'
            $('span').each(function (i) {
                $(this).text(code[i])
            })
        },

        main() {
            for (let i = 0; i < 4; i++) {
                $.index.createLi()
            }
            $.index.reSort()

            $('#add').click(function () {
                $.index.createLi()
                $.index.reSort()
            })

            $('.container').on('click', '.del', function () {
                $(this).parents('li').remove()
                $.index.reSort()
            })


            $('.container').on('click', '.down', function () {
                // a.before(b)  将b挪到a前面
                $(this).parents('li').before($(this).parents('li').next())
                $.index.reSort()
            })

            $('.container').on('click', '.up', function () {
                // a.after(b)  将b挪到a后面
                $(this).parents('li').after($(this).parents('li').prev())
                $.index.reSort()
            })
        }
    }
})