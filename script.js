function showTime() {
    const el = document.getElementById('currentTime');
    if (el) el.innerHTML = new Date().toUTCString();
}

showTime();
setInterval(showTime, 1000);

function checkVisibility() {
    return;
}

function updatePreview() {
    const fields = [
        'labelCode', 'labelName', 'brand',
        'bagCode', 'bagGrade', 'bagSize', 'bagDesc',
        'stickerCode', 'stickerPlace', 'stickerDesc',
        'canvasCode', 'canvasColor', 'canvasDesc',
        'strapCode', 'strapColor', 'strapPattern', 'strapDesc'
    ];

    fields.forEach(field => {
        const input = document.getElementById('f_' + field);
        const preview = document.getElementById('p_' + field);

        if (input && preview) {
            preview.innerText = input.value || '...................................................';
        }
    });

    const rawDate = document.getElementById('f_date').value;
    const previewDate = document.getElementById('p_date');

    if (rawDate && previewDate) {
        const date = new Date(rawDate);
        previewDate.innerText = date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } else if (previewDate) {
        previewDate.innerText = '.......................';
    }

    checkVisibility();
}

function exportPDF() {
    window.print();
}

function createMenu() {
    const menu = document.createElement('nav');
    menu.className = 'main-menu';
    menu.innerHTML = `
        <div class="menu-title">ระบบเอกสาร Master Data Packaging</div>
        <div class="menu-actions">
            <button class="menu-btn active" id="menuMasterData">
                ออกเอกสารขอเพิ่มเงื่อนไข Master Data Packaging
            </button>
            <button class="menu-btn" id="menuNotice">
                ออกแจ้งเพื่อทราบ / แก้ไขเปลี่ยนแปลง
            </button>
        </div>
    `;

    document.body.insertBefore(menu, document.body.firstElementChild);

    document.getElementById('menuMasterData').addEventListener('click', () => {
        showMasterDataPage();
    });

    document.getElementById('menuNotice').addEventListener('click', () => {
        showNoticePage();
    });
}

function setActiveMenu(activeId) {
    document.querySelectorAll('.menu-btn').forEach(button => {
        button.classList.toggle('active', button.id === activeId);
    });
}

function showMasterDataPage() {
    document.querySelector('.form-panel').style.display = 'block';
    document.querySelector('.preview-panel').style.display = 'flex';

    const noticePage = document.getElementById('noticePage');
    if (noticePage) noticePage.style.display = 'none';

    setActiveMenu('menuMasterData');
}

function createNoticePage() {
    const page = document.createElement('div');
    page.id = 'noticePage';
    page.className = 'notice-page';
    page.innerHTML = `
        <div class="notice-form">
            <h3 class="form-header-title">แบบฟอร์มแจ้งเพื่อทราบ / แก้ไขเปลี่ยนแปลง</h3>

            <div class="section-card">
                <div class="section-header blue">ข้อมูลเอกสาร</div>
                <div class="section-body">
                    <label class="form-label">หัวข้อเอกสาร *</label>
                    <input id="notice_title" class="form-control mb-3"
                        placeholder="ระบุหัวข้อแจ้งเพื่อทราบ หรือรายการแก้ไขเปลี่ยนแปลง">

                    <label class="form-label">รหัสป้ายสินค้า / แบรนด์</label>
                    <input id="notice_reference" class="form-control mb-3"
                        placeholder="ระบุรหัสป้ายสินค้า หรือแบรนด์">

                    <label class="form-label">ประเภทการแจ้ง</label>
                    <select id="notice_type" class="form-select mb-3">
                        <option>แจ้งเพื่อทราบ</option>
                        <option>แก้ไขข้อมูล</option>
                        <option>เปลี่ยนแปลงเงื่อนไข</option>
                        <option>ยกเลิกข้อมูลเดิม</option>
                    </select>

                    <label class="form-label">วันที่มีผล</label>
                    <input id="notice_date" type="date" class="form-control mb-3">

                    <label class="form-label">รายละเอียด</label>
                    <textarea id="notice_detail" class="form-control mb-3" rows="5"
                        placeholder="ระบุรายละเอียดของการแจ้งหรือการเปลี่ยนแปลง"></textarea>

                    <label class="form-label">เหตุผล / หมายเหตุเพิ่มเติม</label>
                    <textarea id="notice_remark" class="form-control" rows="4"
                        placeholder="ระบุเหตุผลหรือหมายเหตุเพิ่มเติม"></textarea>
                </div>
            </div>

            <button class="btn-export" id="noticePrintButton">
                🖨 พิมพ์ / บันทึกเป็น PDF
            </button>
            <div class="text-center mt-2 text-muted print-help">
                เลือกเครื่องพิมพ์เป็น “Save as PDF” หากต้องการบันทึกเป็นไฟล์ PDF
            </div>
        </div>

        <div class="preview-panel notice-preview-panel">
            <div class="a4-paper">
                <div class="memo-header">
                    <h1>บันทึกข้อความ</h1>
                    <h2>บริษัท ขอนแก่นแหอวน จำกัด</h2>
                    <div class="logo-kkf"><span>K</span>KF</div>
                </div>

                <div class="memo-meta">
                    <div class="memo-meta-left">
                        <b>เรื่อง :</b> <span id="noticePreviewTitle">........................................</span><br>
                        <b>เรียน :</b> ฝ่าย MIS / สาขาผลิตที่เกี่ยวข้อง<br>
                        <b>จาก :</b> ฝ่ายขาย (Sales Dept.)
                    </div>
                    <div class="memo-meta-right">
                        <b>Memo ID :</b> <span id="noticeMemoId"></span><br>
                        <b>ลงวันที่ :</b> <span id="noticePreviewDate">.......................</span>
                    </div>
                </div>

                <div class="action-box notice-action-box">
                    <div class="action-col">
                        <div class="chk-item"><span class="chk-box checked"></span> เพื่อโปรดทราบ</div>
                        <div class="chk-item"><span class="chk-box"></span> เพื่อพิจารณาอนุมัติ</div>
                    </div>
                    <div class="action-col">
                        <div class="chk-item"><span class="chk-box"></span> เพื่อขอความคิดเห็น</div>
                        <div class="chk-item"><span class="chk-box"></span> เพื่อลงนาม</div>
                    </div>
                    <div class="action-col">
                        <div class="chk-item"><span class="chk-box checked"></span> <b>เพื่อโปรดดำเนินการ</b></div>
                    </div>
                </div>

                <div class="memo-content">
                    <h3>รายละเอียดการแจ้ง</h3>

                    <div class="data-row">
                        <div class="data-label">ประเภทการแจ้ง :</div>
                        <div class="data-value" id="noticePreviewType"></div>
                    </div>

                    <div class="data-row">
                        <div class="data-label">รหัสอ้างอิง :</div>
                        <div class="data-value" id="noticePreviewReference"></div>
                    </div>

                    <div class="data-row">
                        <div class="data-label">วันที่มีผล :</div>
                        <div class="data-value" id="noticePreviewEffectiveDate"></div>
                    </div>

                    <div class="notice-content-box">
                        <b>รายละเอียด :</b>
                        <div id="noticePreviewDetail"></div>
                    </div>

                    <div class="notice-content-box">
                        <b>เหตุผล / หมายเหตุเพิ่มเติม :</b>
                        <div id="noticePreviewRemark"></div>
                    </div>

                    <div style="margin-top: 25px;">
                        จึงเรียนมาเพื่อโปรดทราบและดำเนินการในส่วนที่เกี่ยวข้องต่อไป
                    </div>
                </div>

                <div class="signatures">
                    <div class="sign-box">
                        <div class="sign-line"></div>
                        (.......................................................)<br>
                        <b>พนักงานฝ่ายขาย</b><br>
                        ผู้แจ้งข้อมูล
                    </div>
                    <div class="sign-box">
                        <div class="sign-line"></div>
                        (.......................................................)<br>
                        <b>ฝ่าย Digital / Marketing</b><br>
                        ผู้ตรวจสอบเอกสาร
                    </div>
                    <div class="sign-box">
                        <div class="sign-line"></div>
                        (.......................................................)<br>
                        <b>ฝ่าย MIS</b><br>
                        ผู้รับทราบ / ดำเนินการ
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(page);

    page.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', updateNoticePreview);
    });

    document.getElementById('noticePrintButton').addEventListener('click', exportPDF);

    const randomId = Math.floor(100 + Math.random() * 900);
    document.getElementById('noticeMemoId').innerText = `68-NOTICE-${randomId}`;

    updateNoticePreview();
}

function updateNoticePreview() {
    const values = {
        noticePreviewTitle: document.getElementById('notice_title').value,
        noticePreviewType: document.getElementById('notice_type').value,
        noticePreviewReference: document.getElementById('notice_reference').value,
        noticePreviewDetail: document.getElementById('notice_detail').value,
        noticePreviewRemark: document.getElementById('notice_remark').value
    };

    Object.keys(values).forEach(id => {
        document.getElementById(id).innerText =
            values[id] || '...................................................';
    });

    const date = document.getElementById('notice_date').value;
    document.getElementById('noticePreviewDate').innerText = date
        ? new Date(date).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '.......................';

    document.getElementById('noticePreviewEffectiveDate').innerText = date
        ? new Date(date).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '...................................................';
}

function showNoticePage() {
    document.querySelector('.form-panel').style.display = 'none';
    document.querySelector('.preview-panel').style.display = 'none';

    const noticePage = document.getElementById('noticePage');
    noticePage.style.display = 'flex';

    setActiveMenu('menuNotice');
}

document.addEventListener('DOMContentLoaded', () => {
    createMenu();
    createNoticePage();

    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    const randomId = Math.floor(100 + Math.random() * 900);
    document.getElementById('p_memoId').innerText = `68-MD-${randomId}`;

    updatePreview();
});