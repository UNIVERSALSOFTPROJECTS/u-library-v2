<script>
</script>

<div class="u-app-main">
  <form id="u-app-cover">
    <div id="u-select-box">
      <input type="checkbox" id="u-options-view-button" />
      <div id="u-select-button" class="u-brd">
        <div id="u-selected-value">
          <span>Idioma</span>
        </div>
        <div id="u-chevrons">
          <i class="fas fa-chevron-up" />
          <i class="fas fa-chevron-down" />
        </div>
      </div>
      <div id="u-options">
        <div class="u-option">
          <input class="u-s-c u-top" type="radio" name="platform" value="codepen" />
          <input class="u-s-c u-bottom" type="radio" name="platform" value="codepen"/>
          <img class="u-español-image" src="./home/flags/españa.png" alt="">
          <span class="u-label">Español</span>
          <span class="u-opt-val">Español</span>
        </div>
        <div class="u-option">
          <input class="u-s-c u-top" type="radio" name="platform" value="dribbble"/>
          <input class="u-s-c u-bottom" type="radio" name="platform" value="dribbble"/>
          <img class="u-ingles-image" src="./home/flags/EE-UU.jpg" alt="">
          <span class="u-label">Ingles</span>
          <span class="u-opt-val">Ingles</span>
        </div>
        <div class="u-option">
          <input class="u-s-c u-top" type="radio" name="platform" value="behance" />
          <input class="u-s-c u-bottom"type="radio"name="platform" value="behance"/>
          <img class="u-frances-image" src="./home/flags/francia.png" alt="">
          <span class="u-label">Frances</span>
          <span class="u-opt-val">Fraces</span>
        </div>
        <div id="u-option-bg" />
      </div>
    </div>
  </form>
</div>

<style>
  .u-app-main{
    position: relative;
    top: -7.5rem;
    right: 0rem;
    left: 0;
  }
  #u-app-cover {
    color: #000;
    position: absolute;
    top: 0;
    right: 0rem;
    left: 0;
    justify-content: start;
    width: 4rem;
    height: 42px;
    margin: 100px auto 0 auto;
  }
  .u-brd {
    border: 1px solid #e2eded;
    border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
    color: #000;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
  }
  
  #u-select-button {
    position: relative;
    height: 16px;
    padding: 12px 14px;
    background-color: #fff;
    color: black;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }

  #u-options-view-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  #u-selected-value {
    font-size: 16px;
    width: 100%;
    line-height: 1;
    margin-right: 26px;
  }

  .u-option img {
    width: 16px;
    height: 16px;
  }

  .u-option,
  .u-label {
    color: #2d3667;
    font-size: 16px;
  }

  #u-chevrons {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 0.5rem;
    padding: 9px 14px;
  }

  #u-chevrons i {
    display: block;
    height: 50%;
    color: #d1dede;
    font-size: 12px;
    text-align: right;
  }

  #u-options-view-button:checked + #u-select-button #u-chevrons i {
    color: #2d3667;
  }

  #u-options {
    position: absolute;
    top: 2.5rem;
    right: 0rem;
    left: 0;
    width: 7rem;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 4px;
  }

  #u-options-view-button:checked ~ #u-options {
    border: 1px solid #e2eded;
    border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
  }

  .u-option {
    position: relative;
    line-height: 1;
    transition: 0.3s ease all;
    z-index: 2;
  }

  .u-option img {
    position: absolute;
    left: 14px;
    padding: 0;
    display: none;
  }

  #u-options-view-button:checked ~ #u-options .u-option img {
    display: block;
    padding: 12px 0;
  }

  .u-label {
    display: none;
    padding: 0;
    margin-left: 27px;
  }

  #u-options-view-button:checked ~ #u-options .u-label {
    display: block;
    padding: 12px 14px;
  }

  .u-s-c {
    position: absolute;
    left: 0;
    width: 100%;
    height: 50%;
  }

  .u-s-c.u-top {
    top: 0;
  }

  .u-s-c.u-bottom {
    bottom: 0;
  }

  input[type="radio"] {
    position: absolute;
    right: 0;
    left: 0;
    width: 100%;
    height: 50%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .u-s-c:hover ~ img {
    color: #fff;
    opacity: 0;
  }

  .u-s-c:hover {
    height: 100%;
    z-index: 1;
  }

  .u-s-c.u-bottom:hover + img {
    bottom: -25px;
    animation: moveup 0.3s ease 0.1s forwards;
  }

  .u-s-c.u-top:hover ~ img {
    top: -25px;
    animation: movedown 0.3s ease 0.1s forwards;
  }

  @keyframes moveup {
    0% {
      bottom: -25px;
      opacity: 0;
    }
    100% {
      bottom: 0;
      opacity: 1;
    }
  }

  @keyframes movedown {
    0% {
      top: -25px;
      opacity: 0;
    }
    100% {
      top: 0;
      opacity: 1;
    }
  }

  .u-label {
    transition: 0.3s ease all;
  }

  .u-opt-val {
    position: absolute;
    left: 14px;
    width: 4rem;
    height: 21px;
    opacity: 0;
    background-color: #fff;
    transform: scale(0);
  }

  .u-option input[type="radio"]:checked ~ .u-opt-val {
    opacity: 1;
    transform: scale(1);
  }

  .u-option input[type="radio"]:checked ~ img {
    top: 0;
    bottom: auto;
    opacity: 1;
    animation: unset;
  }

  .u-option input[type="radio"]:checked ~ img,
  .u-option input[type="radio"]:checked ~ .u-label {
    color: #fff;
  }

  .u-option input[type="radio"]:checked ~ .u-label:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  #u-options-view-button:not(:checked) ~ #u-options .u-option input[type="radio"]:checked ~ .u-opt-val {
    top: -30px;
  }

  .u-option:nth-child(1) input[type="radio"]:checked ~ .u-label:before {
    background-color: #000;
    border-radius: 4px 4px 0 0;
  }

  .u-option:nth-child(1) input[type="radio"]:checked ~ .u-opt-val {
    top: -31px;
  }

  .u-option:nth-child(2) input[type="radio"]:checked ~ .u-label:before {
    background-color: #ea4c89;
  }

  .u-option:nth-child(2) input[type="radio"]:checked ~ .u-opt-val {
    top: -71px;
  }

  .u-option:nth-child(3) input[type="radio"]:checked ~ .u-label:before {
    background-color: #0057ff;
  }

  .u-option:nth-child(3) input[type="radio"]:checked ~ .u-opt-val {
    top: -111px;
  }

  .u-option:nth-child(4) input[type="radio"]:checked ~ .u-label:before {
    background-color: #32c766;
  }

  .u-option:nth-child(4) input[type="radio"]:checked ~ .u-opt-val {
    top: -151px;
  }

  .u-option:nth-child(5) input[type="radio"]:checked ~ .u-label:before {
    background-color: #f48024;
  }

  .u-option:nth-child(5) input[type="radio"]:checked ~ .u-opt-val {
    top: -191px;
  }

  .u-option:nth-child(6) input[type="radio"]:checked ~ .u-label:before {
    background-color: #006400;
    border-radius: 0 0 4px 4px;
  }

  .u-option:nth-child(6) input[type="radio"]:checked ~ .u-opt-val {
    top: -231px;
  }
  
  img{
    width: 1rem;
  }

  .u-option .u-español-image{
    color: #000;
  }

  .u-option .u-ingles-image {
    color: #ea4c89;
  }

  .u-option .u-frances-image {
    color: #0057ff;
  }
  #u-option-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 40px;
    transition: 0.3s ease all;
    z-index: 1;
    display: none;
  }

  #u-options-view-button:checked ~ #u-options #u-option-bg {
    display: block;
  }

  .u-option:hover .u-label {
    color: #fff;
  }

  .u-option:nth-child(1):hover ~ #u-option-bg {
    top: 0;
    background-color: #000;
    border-radius: 4px 4px 0 0;
  }

  .u-option:nth-child(2):hover ~ #u-option-bg {
    top: 40px;
    background-color: #ea4c89;
  }

  .u-option:nth-child(3):hover ~ #u-option-bg {
    top: 80px;
    background-color: #0057ff;
  }

  .u-option:nth-child(4):hover ~ #u-option-bg {
    top: 120px;
    background-color: #32c766;
  }

  .u-option:nth-child(5):hover ~ #u-option-bg {
    top: 160px;
    background-color: #f48024;
  }

  .u-option:nth-child(6):hover ~ #u-option-bg {
    top: 200px;
    background-color: #006400;
    border-radius: 0 0 4px 4px;
  }
</style>
