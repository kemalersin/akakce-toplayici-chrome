const regex = /^\d{1,3}(?:\.\d{3})*(?:,\d{2})? TL$/;

(function () {
  var total = 0;

  var observer = new MutationObserver(() => {
    var elements = document.querySelectorAll(
      ".p_w_v9 > .iC:first-child > .pb_v8 > .pt_v8:not(.calculated)"
    );

    elements.forEach((element) => {
      var content = element.textContent;
      var match = content.match(regex);

      element.classList.add("calculated");

      if (match) {
        var str = content.replace(/[^\d,]/g, "").replace(",", ".");
        var num = parseFloat(str);

        total += num;
      }
    });

    if (elements.length && total) {
      var ul = document.getElementById("FL_v8");
      var li = document.createElement("li");

      var trunc = Math.trunc(total);
      var decimal = Math.round((total - trunc) * 100);

      var truncStr = trunc.toLocaleString("tr-TR", {
        maximumFractionDigits: 0,
      });

      li.innerHTML = `
        <a class="pw_v8">
          <span class="w_v8">
            <h3 class="pn_v8">Listedeki en ucuz fiyatların toplamı aşağıdadır:</h3>
          </span> 
        </a>
        <div class="p_w_v9">
          <a class="iC">
            <span class="pb_v8">
              <b>Toplam</b>
              <span class="pt_v8 calculated">
                ${truncStr}<i>,${decimal} TL</i>
              </span>
            </span>
          </a>
        </div>
      `;

      li.classList.add("w", "pl_v9", "ignore");

      ul.appendChild(li);
    }
  });

  observer.observe(document, { childList: true, subtree: true });
})();
