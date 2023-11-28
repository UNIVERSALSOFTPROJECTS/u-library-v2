<script>
  let selected = "aml";
</script>

<div>
  <section class="help">
    <div id="accordion-help">
      <button class="help__header" class:active={selected === "aml"} on:click={() => (selected = "aml")}>Procedimientos de AML<i class="fasfa-arrow-right"></i></button>
      <button class="help__header" on:click={() => (selected = "tandc")} > Términos y Condiciones<i class="fas fa-arrow-right"></i> </button>
      <button class="help__header" class:active={selected === "gameres"} on:click={() => (selected = "gameres")}>Juego Responsable<i class="fas fa-arrow-right"></i></button>
      <div data-bs-toggle="collapse" data-bs-target="#rules" aria-controls="rules" class="help__header accordion-button" aria-expanded="true" > Reglas deportivas y opciones de apuestas </div>
      <div id="rules" data-bs-parent="#accordion-help" class="accordion-collapse collapse show">
        <div class="help__body--sub">
          <button class="help__header--sub" class:active={selected === "defbet"} on:click={() => (selected = "defbet")}> Apuesta Definiciones<i class="fas fa-arrow-right"></i> </button>
          <button class="help__header--sub" class:active={selected === "deportes"} on:click={() => (selected = "deportes")}>Reglas Deportivas<i class="fas fa-arrow-right"></i></button>
          <button class="help__header--sub" class:active={selected === "livebet"} on:click={() => (selected = "livebet")} > Livebetting<i class="fas fa-arrow-right"></i> </button>
          <button class="help__header--sub" class:active={selected === "cash"} on:click={() => (selected = "cash")}>Reglas de Cashout<i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
      <button class="help__header" class:active={selected === "politica"} on:click={() => (selected = "politica")}>Política de Privacidad<i class="fas fa-arrow-right"></i></button>
      <button class="help__header" class:active={selected === "preguntas"} on:click={() => (selected = "preguntas")}>Preguntas frecuentes<i class="fas fa-arrow-right"></i></button>
    </div>

    <div>
      {#if selected === "aml"}
        <div class="help__header--title">Procedimientos de AML</div>
        <div class="help__body">
          <h6>Introducción</h6>
          <p>
            La Empresa ha implementado medidas adecuadas para evitar que sus
            sistemas se utilicen con fines de lavado de dinero, financiamiento
            del terrorismo o cualquier otra actividad delictiva. Por lo tanto,
            la Empresa está obligada a seguir las disposiciones contenidas en el
            marco legal internacional y las reglas de Prevención de Lavado de
            Dinero, utilizando como modelo las reglas prescritas en las
            Directivas 2005/60 / CE y 2006/70 / CE para Prevenir el Lavado de
            Dinero y la Financiación de Terrorismo.
          </p>
          <h6>Objetivo</h6>
          <p>
            La Empresa está totalmente comprometida a estar constantemente
            vigilante para prevenir el lavado de dinero y combatir el
            financiamiento del terrorismo para minimizar y gestionar riesgos
            tales como los riesgos para su reputación, el riesgo legal y el
            riesgo regulatorio. También está comprometido con su deber social de
            prevenir delitos graves y no permitir que se abuse de sus sistemas
            para promover estos delitos.
          </p>
          <p>
            La Empresa se esforzará para mantenerse actualizada con los
            desarrollos a nivel nacional e internacional sobre cualquier
            iniciativa para prevenir el lavado de dinero y la financiación del
            terrorismo. Se compromete a proteger, en todo momento, a la
            organización y sus operaciones y salvaguarda su reputación y todo
            ello de la amenaza del lavado de dinero, la financiación de
            actividades terroristas y otras actividades delictivas.
          </p>
          <h6>Obligaciones</h6>
          <p>
            Con el fin de cumplir con los requisitos de la Ley de Prevención de
            Lavado de Dinero, las normas y las notas orientativas, la Empresa ha
            implementado:
          </p>
          <ul>
            <li>
              Uno de sus oficiales superiores como el Oficial de Reporte de
              Lavado de Dinero (MLRO) designado, cuyas responsabilidades
              incluirán los deberes requeridos por las regulaciones de las leyes
              y las notas orientativas.
            </li>
            <li>
              Tomar medidas razonables para establecer la identidad de cualquier
              persona para la cual se propone brindar su servicio.
            </li>
          </ul>
          <p>
            Para este propósito, el proceso para el registro de Jugadores bajo
            los Términos y Condiciones Generales proporciona para el proceso de
            diligencia debida que se lleva a cabo antes de la apertura de una
            Cuenta de Usuario las siguientes precauciones:
          </p>
          <ul>
            <li>
              Mantener en todo momento una lista segura en línea de todos los
              Jugadores registrados.
            </li>
            <li>
              Conservar la identificación y la documentación transaccional tal
              como se define en las notas reglamentarias de las leyes.
            </li>
            <li>
              Proporcionar entrenamiento inicial y continuo a todo el personal
              relevante y los procedimientos con respecto a la identificación de
              los Jugadores, el monitoreo de la actividad del Jugador, el
              mantenimiento de registros y el reporte de cualquier transacción
              inusual/sospechosa.
            </li>
            <li>
              Asegurar que esta política se desarrolle y mantenga de acuerdo con
              la evolución de las obligaciones legales y reglamentarias y
              consejos de las autoridades pertinentes.
            </li>
            <li>
              Examinar con especial atención, y en la medida de lo posible, los
              antecedentes y el propósito de cualquier transacción compleja o
              grande y cualquier transacción que sea particularmente probable,
              por su naturaleza, que esté relacionada con el lavado de dinero o
              la financiación del terrorismo.
            </li>
            <li>
              Informar a la Junta sobre cualquier sospecha o conocimiento de
              lavado de dinero o financiamiento del terrorismo y, si es
              necesario, denunciar estos abusos al Ministro de Finanzas de la
              Junta para la recolección, recopilación, procesamiento, análisis y
              difusión de información con el fin de prevenir el lavado de dinero
              y combatir la financiación del terrorismo.
            </li>
            <li>
              Cooperar con todas las autoridades administrativas, de ejecución y
              judiciales pertinentes en su esfuerzo por prevenir y detectar
              actividades delictivas.
            </li>
          </ul>
          <p>La Empresa no:</p>
          <ul>
            <li>
              Acepta abrir cuentas anónimas o cuentas con nombres ficticios de
              modo que no se conozca al verdadero beneficiario real;
            </li>
            <li>
              Acepta dinero en efectivo de los jugadores. Los fondos de los
              Jugadores solo se pueden recibir por cualquiera de los siguientes
              métodos: tarjetas de crédito, tarjetas de débito, transferencias
              electrónicas, cheques de transferencia bancaria y cualquier otro
              método aprobado por la Junta de la empresa;
            </li>
            <li>Registra a un Jugador menor de dieciocho (18) años de edad;</li>
            <li>
              Solo registra una sola cuenta a nombre de una persona: las
              prácticas de múltiples cuentas están estrictamente prohibidas;
            </li>
            <li>
              Transfiere los pagos de ganancias o reembolsos a la misma ruta
              desde donde se originaron los fondos, cuando sea posible;
            </li>
            <li>
              Acepta una apuesta a menos que se haya establecido una Cuenta de
              usuario a nombre del Jugador y que haya fondos adecuados en la
              Cuenta para cubrir el monto de la apuesta;
            </li>
            <li>
              Acepta una apuesta a menos que los fondos necesarios para cubrir
              el monto de la apuesta se proporcionen de manera aprobada;
            </li>
            <li>
              Acepta jugadores que residan o jueguen en jurisdicciones no
              acreditadas;
            </li>
            <li>
              Hace un pago de más de 2000 euros de una cuenta de usuario a un
              jugador hasta que se haya verificado la identidad, la edad y el
              lugar de residencia del jugador;
            </li>
            <li>
              Si no se ha registrado ninguna transacción en una cuenta de
              usuario durante treinta meses, cierra la cuenta de usuario y envía
              el saldo de esa cuenta al jugador;
            </li>
            <li>
              Cuando parezca necesario, verifica la solvencia del Jugador con
              terceros que previamente proporcionaron información sobre el
              Jugador;
            </li>
            <li>
              Si se da cuenta de que una persona ha proporcionado información
              falsa al proporcionar documentos de diligencia debida, no debe
              registrar a esa persona. Cuando esa persona ya haya sido
              registrada, la Empresa cancelará inmediatamente el registro de esa
              persona como Jugador en la empresa.
            </li>
          </ul>
        </div>
      {/if}
      {#if selected === "tandc"}
        <div class="help__header--title">Términos y Condiciones</div>
        <div class="help__body">
          <h6>Terms and Conditions (ENGLISH VERSION)</h6>
          <p>Global Terms and Conditions</p>
          <p>
            IMPORTANT – PLEASE READ THE FOLLOWING CAREFULLY BEFORE ACCEPTING
            THESE TERMS AND CONDITIONS. WE RECOMMEND YOU PRINT THE CONTENT OF
            THIS AGREEMENT AND STORE IT ALONG WITH ALL CONFIRMATION EMAILS,
            ADDITIONAL TERMS, TRANSACTION DATA, GAME RULES AND PAYMENT METHODS
            AS THEY RELATE TO YOUR USE OF THIS SITE. WE DO NOT FILE EACH
            INDIVIDUAL CONTRACT WITH USERS SO PLEASE PRINT IT OUT FOR YOUR
            RECORDS. THESE TERMS AND CONDITIONS ARE SUBJECT TO CHANGE WITHOUT
            PRIOR NOTICE. NOTIFICATION OF THESE TERMS AND CONDITIONS CONSTITUTES
            THE MAKING OF AN OFFER. BY REGISTERING TO MAKE USE OF THE SERVICES
            COVERED BY THIS AGREEMENT, YOU ARE CERTIFYING THAT YOU ARE 18 YEARS
            OF AGE OR OLDER AND YOU AGREE TO BE BOUND BY THE FOLLOWING TERMS AND
            CONDITIONS. IF YOU DO NOT WISH TO ACCEPT THE FOLLOWING TERMS AND
            CONDITIONS, YOU MUST NOT REGISTER AND YOU MUST NOT OPEN AN ACCOUNT
            AND YOU WILL BE UNABLE TO ACCESS THE SOFTWARE AND THE GAMING
            SERVICES OFFERED IN CONJUNCTION THEREWITH.
          </p>
          <p>
            INTRODUCTION: KEY DEFINITIONS AND WHAT MAKES UP YOUR TERMS OF USE
          </p>
          <p>
            1.1 The following definitions are used in these terms and
            conditions: “Access Device” means any electronic means of accessing
            the Services, including, but not limited to, computers, smartphone
            devices, feature phones, tablet devices, touch devices or any home
            entertainment system such as video games consoles and smart TVs (or
            by any other remote means); “Bonus Terms” means any terms and
            conditions and/or rules with regard to promotions, bonuses and
            special offers which may apply to any part of the Services from time
            to time; “Download Terms” means any additional end user terms and
            conditions of use which You are required to confirm Your agreement
            to as part of the download and/or installation of any software which
            You may download in order to be able to use the Website; “Gambling
            Commission” means the regulator of commercial gambling in Curaçao
            whose website is at https://www.curacao-egaming.com/ “General Terms”
            means the terms and conditions set out in this document; “Group”
            means in relation to any party, a company which is from time to time
            a subsidiary or the ultimate holding company of that party or
            another direct or indirect subsidiary of any such ultimate holding
            company. “Privacy Policy” means the Operator’s privacy policy
            accessed via the Privacy Policy link; “Rules” means the Betting
            Rules and the Game Rules specifically applicable to the relevant
            type of betting and/or gaming, as identified in more detail in
            paragraph 1.3.1 and 1.3.2; “Services” means, as appropriate, the
            services offered for the time being by the Operator through the
            Website, Telebetting and/or via any Access Device application;
            “Telebetting ” means the telephone betting service for the time
            being offered by the Operator; “Terms of Use” means (a) the General
            Terms; (b) the Privacy Policy; (c) where appropriate under paragraph
            1.3, the relevant Rules, Bonus Terms and Additional Terms applicable
            to the Services that are being used by You; and (d) any Download
            Terms; and “Website” means the website or any respective page,
            subpage, subdomain or section thereof from time to time, located at
            or accessible via the domain name: www.coliseosport.com<br />
            1.2 By using and/or visiting any section of the Website, or by opening
            an account with the Operator-through the Website, or through accessing
            Telebetting, You agree to be bound by the Terms of Use and You accordingly:
            (a) agree to the use of electronic communications in order to enter into
            contracts; and (b) waive any applicable rights or requirements which
            require a signature by hand, to the extent permitted by any applicable
            law. The Terms of Use do not affect your statutory rights. <br />
            1.3 In addition, where You play any game, or place a bet using the Services,
            or otherwise use the Services, You agree to be bound by:<br />
            1.3.1 the Rules For All Sports Bets on the DBG Sportsbook as set out
            under the general Help section (“the Betting Rules”);<br />
            1.3.2 the Rules of any game You play (“Game Rules”), as set out under
            the relevant general Help section and any Rules tabs, including (without
            limitation):<br />
            1.3.2.1 for games under the ‘Casino’ tab: the Casino Rules for the relevant
            game; <br />
            1.3.2.2 for games under the ‘Poker’ tab: the Poker Rules for the relevant
            game; <br />
            1.3.2.3 for games under the ‘Games’ tab: the Games Rules for the relevant
            game; <br />
            1.3.2.4 for Live Casino games under the ‘Live Casino’ tab: the Live Casino
            Rules for the relevant game; <br />
            1.3.2.5 in respect of any new games, the rules applicable to such game;
            <br />
            1.3.3 Any Bonus Terms; <br />
            1.3.4 Any Download Terms; <br />
            1.3.5 Any terms and conditions relating to withdrawals which are contained
            in the ‘Withdrawal’ part of the Help section of the Website (“Withdrawal
            Terms”); <br /> and 1.3.6 Any other terms applicable to the Services
            and/or which You are required to confirm Your agreement to as part
            of the Services, for example the terms relating to the Tip Advisor
            service (“Additional Terms”)<br />
            1.4 The original text of the Terms of Use are in English and any interpretation
            of them will be based on the original English text. If the Terms of Use
            or any documents or notices related to them are translated into any other
            language, the original English version will prevail.<br />
            1.5 In the event that there is any specific conflict or inconsistency
            between any of the individual parts of the Terms of Use making up Your
            contract with the Operator, the order of precedence shall be as follows:<br
            />
            1.5.1 The Withdrawal Terms<br />
            1.5.2 The Bonus Terms<br />
            1.5.3 The Betting Rules<br />
            1.5.4 The Game Rules<br />
            1.5.5 The Additional Terms<br />
            1.5.6 The General Terms<br />
            1.5.7 The Privacy Policy<br /> and 1.5.8 The Download Terms.<br />
            1.6 Please read the Terms of Use carefully before accepting them. Once
            You have accepted the Terms of Use, please print the Terms of Use and
            store them, along with all confirmation emails, additional terms, transaction
            data, game rules, fair deal rules and payment methods relevant to Your
            use of the Website. Please note that the Terms of Use are subject to
            change, as set out in paragraph 3 below<br />
            p1.7 If You do not agree to accept and be bound by the Terms of Use please
            do not open an account, and/or continue to use Your Account. Your continued
            use of any of the Services will constitute acceptance of the Terms of
            Use which we have notified You are in force from time to time.
            <br />
            1.7 If You do not agree to accept and be bound by the Terms of Use please
            do not open an account, and/or continue to use Your Account. Your continued
            use of any of the Services will constitute acceptance of the Terms of
            Use which we have notified You are in force from time to time.
            <br />
            1.8 The Terms of Use govern Your contract with the Operator and will
            come into effect on 1 august 2015 For the avoidance of doubt, each and
            all sections of the Website and Telebetting are governed by the Terms
            of Use, and You should ensure at all times that Your use of the Services
            is in accordance with the Terms of Use. <br />
            GENERAL TERMS <br />
            CONTRACTING PARTIES <br />
            2.1 References in the Terms of Use to “us”, “our” or “we” are references
            to: <br />
            2.2.1 The Operator; or <br />
            2.2.2 In the case of terms and conditions relating to monies held in
            Your Account from time to time, to any Operator Group company which holds
            such money and shall (where appropriate) be deemed to include our agents,
            partners, and suppliers. <br />
            CHANGES TO THE TERMS OF USE <br />
            3.1 We may need to change the Terms of Use from time to time for a number
            of reasons, including (without limitation) for commercial reasons, to
            comply with law or regulations, to comply with instructions, guidance
            or recommendations from a regulatory body, or for customer service reasons.
            The most up-to-date Terms of Use can be accessed from the Terms and Conditions
            link in the footer section of the Website, and the date on which they
            will come into force is noted in paragraph 1.8 of these General Terms.<br
            />
            3.2 Where we wish to make substantial changes to the Terms of Use, we
            will give You as much prior notice of such changes as is reasonably practicable
            via one of the methods set out in paragraph 3.3. For minor or insubstantial
            changes, we may not give You any notice of such changes, so You are advised
            to review the Terms of Use through the Terms and Conditions link on the
            Website on a regular basis.<br />
            3.3 Where we make changes to the Terms of Use which we wish to notify
            You of, we will do so by such method of notification as we may, in our
            discretion, deem appropriate, which may comprise:<br />
            3.3.1 Email (to the email address You have previously supplied us with,
            if any);<br />
            3.3.2 A message to Your Inbox on the Website; or<br />
            3.3.3 Notice on the Website<br />
            And we may, at our discretion, invite You to accept the new Terms of
            Use by clicking on “yes” or “I accept”, checking a ‘tick box’ or any
            other similar method of confirmation by You. If You provide us with any
            such confirmation, or continue to use the Website or Telebetting after
            notification under this paragraph 3, You shall, from such time, be deemed
            to have accepted, and be bound by, the new Terms of Use, including (for
            the avoidance of doubt) any additions, removals, substitutions or other
            changes to the identities of the Operator, whether or not You have read
            the revised Terms of Use. If any change is unacceptable to You, You may
            either cease using the Services and/or close Your Account by complying
            with paragraph 12 of these General Terms.<br />
            3.4 Not withstanding this clause 3, should we wish to make any changes
            to the terms upon which Your funds are held under clause 7.3, we shall
            notify You in advance by such method as we may, in our discretion, deem
            appropriate, but such method shall require You to acknowledge receipt
            of such information by clicking on “yes” or “I accept”, checking a ‘tick
            box’ or any other similar method of acknowledgment by You. If You provide
            us with any such acknowledgment, You shall, from such time, be deemed
            to have accepted, and be bound by, the new Terms of Use. If any change
            is unacceptable to You, You may either cease using the Services and/or
            close Your Account by complying with paragraph 12 of these General Terms.
            <br />
            OPENING YOUR ACCOUNT <br />
            4.1 In order to place a bet or play a game using the Services, You will
            need to open an account with the Operator (“Your Account” or “Account”).
            <br />
            4.2 In order to open Your Account for use with the Services, You can:
            <br />
            4.2.1 Contact Customer Services; <br />
            4.2.2 Click on Registration on the Website and follow the on-screen instructions;
            or <br />
            4.2.3 Open by such other Account opening method as shall, from time to
            time be offered by theOperator; <br />
            4.3 Your Account will either be operated by the Operator, or by another
            company in its Group for and on behalf of itself and/or the relevant
            Operator Group company with whom You have contracted. <br />
            4.4 When You open Your Account You will be asked to provide us with personal
            information, including Your name and date of birth and appropriate contact
            details, including an address, telephone number and e-mail address (“Your
            Contact Details”). You may update Your Contact Details from time to time
            by contacting Customer Services; or through the My Account management
            page on the Website: or by such other method as shall, from time to time,
            be offered by the Operator. <br />
            4.5 If You do not wish Your Contact Details to be used by us and our
            business partners to contact You to inform You of marketing information
            relating to others of our goods, products or services or those of our
            business partners, please indicate that this is the case by ticking the
            relevant box as instructed when You open an account on the Website or
            by informing Customer Services. <br />
            4.6 In opening Your Account You warrant that: <br />
            4.6.1 You understand and accept the risk that, by using the Services,
            You may, as well as winning money, lose money; <br />
            4.6.2 You are: (a) over 18 years of age; and (b) above the age at which
            gambling or gaming activities are legal under the law or jurisdiction
            that applies to You (the “Relevant Age”); <br />
            4.6.3 Gambling is not illegal in the territory where You reside;
            <br />
            4.6.4 You are legally able to enter into contracts; <br />
            4.6.5 You have not been excluded from gambling; and <br />
            4.6.6 You have not already had an Account closed by us under paragraphs
            11 (Collusion, Cheating, Fraud and Criminal Activity), 20 (Breach of
            the Terms of Use) or at Your request under paragraph 33.1 (Responsible
            Gaming/Gambling). <br />
            4.7 Your Account must be registered in Your own, correct, name and personal
            details and it shall only be issued once for You and not duplicated through
            any other person, family, household, address (postal or IP), email address,
            Access Device or any environment where Access Devices are shared (e.g.
            schools, workplaces, public libraries etc) and/or account in respect
            of the Services. Any other accounts which You open with us, or which
            are beneficially owned by You in relation to the Services shall be “Duplicate
            Accounts”. We may close any Duplicate Account (but shall not be obliged
            to do so). If we close a Duplicate Account: <br />
            4.7.1 All bonuses, free bets and winnings accrued from such bonuses and
            free bets obtained using that Duplicate Account will be void and forfeited
            by You; <br />
            4.7.2 We may, at our entire discretion, void all winnings and refund
            all deposits (less amounts in respect of void winnings) made in respect
            of that Duplicate Account and, to the extent not recovered by us from
            the relevant Duplicate Account, any amounts to be refunded to us by You
            in respect of a Duplicate Account may be recovered by us directly from
            any other of Your Accounts (including any other Duplicate Account); or
            <br />
            4.7.3 We may, at our entire discretion, allow usage of the Duplicate
            Account to be deemed valid in which case all losses and stakes placed
            by or for You through the Duplicate Account shall be retained by us.
            <br />
            VERIFICATION OF YOUR IDENTITY; MONEY LAUNDERING REQUIREMENTS<br />
            5.1 You warrant that:<br />
            5.1.1 The name and address You supply when opening Your Account are correct;
            and<br />
            5.1.2 You are the rightful owner of the money which You at any time deposit
            in Your ccount.<br />
            5.2 By agreeing to the Terms of Use You authorize us to undertake any
            such verification checks from time to time as we may require ourselves
            or may be required by third parties (including, but not limited to, regulatory
            bodies) to confirm these facts (the “Checks”). You agree that from time
            to time, upon our request, You may be required to provide additional
            details in respect of any of such information You have provided us, including
            in relation to any deposits which You have made into Your Account.<br
            />
            5.3 Whilst we are undertaking any Checks from time to time, we may restrict
            You from withdrawing funds from Your Account and/or prevent access to
            all or certain parts of the Website. Please note that we may from time
            to time repertory the Checks for regulatory, security or other business
            reasons. If any such restrictions cause You a problem, please contact
            Customer Services.<br />
            5.4 In certain circumstances we may have to contact You and ask You to
            provide further information to us directly in order to complete the Checks.
            For this purpose, we will be entitled, at our sole discretion, to require
            that You provide us with a notarized ID or any equivalent certified ID
            according to the applicable law of Your jurisdiction or otherwise, proof
            of address, utility bills, bank details, bank statements and bank references.
            Until such information has been supplied to our satisfaction we may prevent
            any activity to be undertaken by You in relation to the Account or we
            may, where we reasonably believe that deliberately incorrect information
            has been provided by You, keep any amount deposited on the Account following
            the closure of the Account by us.<br />
            5.5 It may be an offence for persons under the Relevant Age to make use
            of the Website. If we are unable to confirm that You are the Relevant
            Age then we may suspend Your Account until such time that we are able
            to confirm that You are the Relevant Age. If You are subsequently proven
            to have been under the Relevant Age at the time You made any gambling
            or gaming transactions with us, then:<br />
            5.5.1 Your Account will be closed;<br />
            5.5.2 all transactions made whilst You were underage will be made void,
            and all related funds deposited by You will be returned by the payment
            method used for the deposit of such funds, wherever practicable;<br
            />
            5.5.3 Any deposits made whilst You were under the Relevant Age will be
            returned to You; and<br />
            5.5.4 Any winnings which You have accrued during such time when You were
            under the Relevant Age will be forfeited by You (and may be deducted
            from the amount of any deposit returned under paragraph 5.5.3) and You
            will return to us on demand any such funds which have been withdrawn
            from Your Account.<br />
            USERNAME, PASSWORD, PIN and CUSTOMER INFORMATION<br />
            6.1 After opening Your Account, You must take all reasonable steps to
            avoid disclosing (whether deliberately or accidentally) Your username,
            password and/or account number to anyone else, including (where practicable)
            ensuring that up-to-date security software is downloaded onto Your Access
            Device.<br />
            6.2 All transactions made where Your username and password and/or account
            number have been entered correctly will be regarded as valid, whether
            or not authorized by You, and we shall not be liable for any claims in
            the event that You disclose Your username, password or account number
            to anyone else (whether deliberately or accidentally).<br />
            6.3 If You have lost or forgotten Your Account details, or have reason
            to believe that such details are known to an unauthorized third party,
            please contact us immediately for a replacement through Customer Services,
            details of which can be found in the Contact Us section of the Website.
            <br />
            DEPOSITS AND WITHDRAWALS FROM YOUR ACCOUNT<br />
            7.1 If You wish to participate in the Services, You must deposit money
            into Your Account from an account or source of which You are the account
            holder. Such money may (subject to paragraph 5) then be used by You to
            place bets or play games. Further details of how to deposit, withdraw
            and transfer funds can be found in the Deposit part of the Help section
            of the Website. If You use a payment method in respect of which You are
            not the account holder, we reserve the right to treat any deposit into
            the Account as being invalid (and any winnings arising from such deposit
            as void) pending the satisfactory completion of all relevant Checks.<br
            />
            7.2 You further agree not to make any charge-backs, reversals or otherwise
            cancel any deposits into Your Account, and in any such event to refund
            and compensate us for such unpaid deposits including any expenses incurred
            by us in the process of collecting Your deposit. For the avoidance of
            doubt Your Account shall not be used by You as a bank account and, should
            we become aware of deposits into and withdrawals from Your Account without
            commensurate betting or gaming activity, we reserve the right to deduct
            an administration charge (whether or not we close or suspend the account).
            Monies deposited with us in Your Account shall not attract interest.<br
            />
            7.3 We are required by our license to inform customers about what happens
            to money which we hold on account for You, and the extent to which such
            money is protected in the event on insolvency. Money deposited by You
            to Your Account will be held in a bank account and/or escrow account
            which will be kept separate from our company funds. Money in Your Account
            are not insured, guaranteed, sponsored or otherwise protected by any
            deposit or banking insurance system or by any other similar insurance
            system. As such, money in Your Account is not protected in the event
            of insolvency. This meets the Gambling Commission’s requirements for
            the segregation of customer funds at the level: basic segregation.<br
            />
            7.4 We may at any time set off any positive balance on Your Account against
            any amount owed by You (including under a Duplicate Account) to any other
            company within the Operator’s Group (irrespective of whether there has
            been a breach of the Terms of Use), including (without limitation) where
            we re-settle any bets or wagers pursuant to paragraph 4.7(Duplicate Accounts),
            paragraph 12 (Collusion, Cheating, Fraud and Criminal Activity) or paragraph
            19 (Errors or Omissions).<br />
            7.5 To the extent required by Your local law or tax or other authorities
            You are responsible for reporting Your winnings and losses arising from
            the Services.<br />
            7.6 You can set a deposit limit on Your Account in any one day. This
            limit cannot be increased without giving us twenty four hours’ notice
            of Your wish to increase Your deposit limit and only when twenty four
            hours have elapsed from Your request for such an increase will the increase
            apply. For details of how to set up a deposit limit please contact Customer
            Services, or (where Your Account is for the Website) set up the limit
            through the Website by clicking on My Account, then Update Account Details.
            Any confirmed reductions to your deposit limit will be of immediate effect.<br
            />
            7.7 Subject to paragraph 13 (Closure of Your Account; etc), You may request
            withdrawal of funds from Your Account at any time provided that:<br
            />
            7.7.1 All payments made into Your Account have been confirmed as cleared
            and none have been charged-back, reversed or otherwise cancelled;<br
            />
            7.7.2 Any Checks referred to in paragraph 5 (Verification of Your Identity;
            Money Laundering Requirements) above have been completed by us to our
            satisfaction; and 7.7.3 You have complied with any other relevant withdrawal
            conditions affecting Your Account (e.g. any applicable Bonus Terms).<br
            />
            7.8 On any withdrawal approved by us, provided that You give us sufficient
            information as to how the funds should be transferred to You, we will
            return the relevant funds to You in accordance with paragraph
            <br />7.7 (less charges incurred or any other amount required to be
            deducted from Your withdrawal in order to comply with any applicable
            law). 7.9 We will attempt to accommodate Your request regarding the
            payment method and currency of payment of Your withdrawal. This,
            however, cannot be guaranteed. Therefore, we may process and pay
            withdrawals in a different payment method than the one requested by
            You, such as through different payment providers, a bank draft or
            wire transfer (any charges associated with relevant payment methods
            are set out in the Withdrawal part of the Help section of the
            Website). Similarly, in certain cases, the currency of Your
            withdrawal may not be the currency in which Your deposit was made or
            that was otherwise requested by You and, in circumstances where we
            are required to convert Your deposits between different currencies,
            the conversion rate used by us is as stated in the Help section of
            the Website. <br />
            LEGAL USE OF THE WEBSITE<br />
            8.1 Access to or use of the Website or any of the Services via the Website
            may not be legal for some or all residents of or persons in certain countries.
            We do not intend that the Website should be used for betting, gaming
            or any other purposes by persons in countries in which such activities
            are illegal, which includes the United States of America and those territories
            listed via the Help section on the Website. The fact that the Website
            is accessible in any such country, or appears in the official language
            of any such country shall not be construed as a representation or warranty
            with respect to the legality or otherwise of the access to and use of
            the Website, and the making of deposits or receipt of any winnings from
            Your Account. The availability of the Website does not constitute an
            offer, solicitation or invitation by us for the use of or subscription
            to betting, gaming or other services in any jurisdiction in which such
            activities are prohibited by law.<br />
            8.2 It is Your responsibility to determine the law that applies in the
            location in which You are present. You should ensure that You will be
            acting legally in Your jurisdiction in opening Your Account and/or using
            the Website and You represent, warrant and agree that You will do so.<br
            />
            8.3 If it becomes apparent to us that You are resident in a country in
            which the use of the Website is not legal, we shall be entitled immediately
            to close Your Account, in which case any balance on the Account on the
            date of such closure will be refunded to You as soon as it is practicable
            for us to do so.<br />
            PLACING YOUR BET AND/OR GAMING USING THE SERVICES<br />
            9.1 In order to place a bet or access a Service you should follow the
            instructions provided at the Help section.<br />
            9.2 It is Your responsibility to ensure that the details of any bet,
            stake or similar transaction that you place using the Services (a “Transaction”)
            are correct in the following manner:<br />
            9.2.1 When using the Website (either directly, through an application
            or otherwise) in accordance with the relevant Betting Rules or Game Rules,
            as appropriate; and<br />
            9.2.2 When using Telebetting, your bet will be read back to you and you
            will be asked to confirm that it is correct to our telephone agent.<br
            />
            9.3 Your Transaction history can be accessed by you by clicking My Account
            on the Website, or through our Customer Services team (including by opting
            to receive a written statement).<br />
            9.4 We reserve the right to refuse the whole or part of any Transaction
            requested by You (if we believe that there is money laundering involved,
            cheating, or any other fraudulent behavior), or where You have breached
            the Terms of Use. No Transaction is accepted by us until You have given
            the appropriate confirmation (or it has otherwise been accepted by us)
            in accordance with paragraph <br />9.2. If your transaction has not
            been added to your account, please contact our Customer Support.<br
            />
            9.5 Once a Transaction has been accepted by us, You cannot cancel the
            transaction unless we agree otherwise. If You are making a telephone-betting
            transaction and the relevant telephone connection becomes unexpectedly
            disconnected, we shall nevertheless place the relevant bet if (a) we
            are clear as to your intended instruction; (b) the bet details have been
            provided to us by You prior to the point at which we cease accepting
            bets on the relevant event; and (c) the bet is acceptable to us in the
            ordinary course of business. In the event of any such telephone disconnection,
            You should immediately contact our Customer Service team for confirmation
            as to whether your bet has been placed.<br />
            9.6 We may, at our discretion (and provided that neither You nor we gain
            any unfair advantage), elect to accept a bet notwithstanding that the
            relevant event has begun. In respect of gaming, the relevant Game Rules
            shall set out the point at which no further stakes will be accepted by
            us.<br />
            9.7 We may cancel or amend a Transaction pursuant to the provisions of
            paragraph 5 (Verification of Your Identity), paragraph 12 (Collusion,
            Cheating, Fraud and Criminal Activity) or paragraph 19 (Errors or Omissions).<br
            />
            9.8 Regarding Netent restriction policies, Afghanistan, Albania, Algeria,
            Angola, Cambodia, Ecuador, Guyana, Hong Kong, Indonesia, Iran, Iraq,
            Israel, Kuwait, Lao, Myanmar, Namibia, Nicaragua, North Korea, Pakistan,
            Panama, Papua New Guinea, Philippines, South Korea, Sudan, Singapore,
            Syria, Spain, Taiwan, Uganda, the United Kingdom, Yemen, Zimbabwe, as
            well as residents of any other country where prohibited by local laws
            can not play their games. The Player acknowledges that some games may
            not be available in all countries. In addition to the countries listed
            above, games offered by NetEnt are not available in Belgium, Bulgaria,
            Canada, Denmark, Estonia, France, Italy, Mexico, Portugal, Romania, Spain,
            United States of America, United Kingdom. NetEnt games Guns &amp; Roses,
            Jimi Hendrix &amp; Motorhead are further not permitted in the following
            countries: Australia, Azerbaijan, China, India, Malaysia, Qatar, Russia,
            Thailand, Tunisia, Turkey &amp; Ukraine; game Aliens is further not permitted
            in Japan, while Universal Monsters, Scarface, and South Park can be only
            played in the following countries: Andorra, Armenia, Azerbaijan, Belarus,
            Bosnia and Herzegovina, Brazil, Georgia, Iceland, Liechtenstein, Moldova,
            Monaco, Montenegro, Norway, Russia, San Marino, Serbia, Switzerland,
            Ukraine, Croatia, Macedonia, Austria, Cyprus, Czech Republic, Finland,
            Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg,
            Malta, Netherlands, Peru, Poland, Portugal, Romania, Slovakia, Slovenia,
            Sweden.<br />
            REMOTE GAMING OR BETTING<br />
            10.1 Where You are accessing the Services via an electronic form of communication
            You should be aware that:<br />
            10.1.1 In relation to Your use of the Website for the placing of bets
            or playing of games:<br />
            10.1.1.1 You may be using a connection or equipment which is slower than
            such equipment used by others and this may affect Your performance in
            time critical events offered via the Website;<br />
            10.1.1.2 You may encounter system flaws, faults, errors or service interruption
            which will be dealt with in accordance with paragraph 18 (Failure);<br
            />
            10.1.1.3 The Game Rules for each event or game offered via the Website
            are available and should be considered by You prior to Your use of the
            Services offered via the Website; and<br />
            10.1.1.4 In games offered via the Website which benefit from more players
            or greater liquidity we may deploy automated players (“Bots”)(whose usernames
            will be “bot”) who are pre-programmed to play and join in with the game
            in order to assist the liquidity or the number of players gaming, although
            we will not use Bots without making such usage clear to You. We can categorically
            confirm that We do not deploy Bots in our Poker software and will take
            active steps in conjunction with our software providers to prevent their
            usage by any users of the Services; and<br />
            10.1.2 In relation to Your use of the Services, if You are betting on
            an “in running” event, You may not at any relevant time be able to see
            or otherwise be provided with the most upto-date information in relation
            to the relevant event. We shall not be liable to You in respect of any
            losses suffered or costs incurred by You as a result of any delay in
            the transmission of information relating to any “in running” event.<br
            />
            REFUND POLICY<br />
            11.1 Players shall not treat the gaming account as a bank account, nor
            expect interest on their deposits. All deposits are for entertainment
            purposes only and not to be considered as business transactions. Hence
            if a player is making a deposit then they need to rollover 1X of their
            deposit. In cases where refunds need to be made, following rules shall
            apply.<br />
            11.2 Any refund request must be made within 24 hours of the purchase
            by a written request to consulta@coliseosport.com Players need to furnish
            the below details: • The valid reason for Refund Claim • Front copy of
            credit/debit card used for making the transaction, valid photo id proof
            and address proof.<br />
            11.3 After receiving the email, we will investigate the request; standard
            processing time is 3-4 working days from the date of request. In case
            the refund request has been accepted, following charges apply: A 5% fee
            on the deposit amount 11.4 A €5 admin fee per request<br />
            11.5 Refund will be counted on basis of remaining balance in the account
            leaving winnings apart. Rollover done by player and winnings derived
            from the particular deposit will not be considered for refunds.<br
            />
            COLLUSION, CHEATING, FRAUD AND CRIMINAL ACTIVITY<br />
            12.1 The following practices (or any of them) in relation to the Services:
            Abuse of bonuses or other promotions; and/or Using unfair external factors
            or influences (commonly known as cheating); and/or Taking unfair advantage;
            Opening any Duplicate Accounts; and/or undertaking fraudulent practice
            or criminal activity, Constitute “Prohibited Practices” and are not permitted
            and will constitute a material breach of the Terms of Use. We will take
            all reasonable steps to prevent and detect such practices and to identify
            the relevant players concerned if they do occur. Subject to the above,
            however, we will not be liable for any loss or damage which You may incur
            as a result of any Prohibited Practices, and any action we take in respect
            of the same will be at our sole discretion.<br />
            12.2 If You suspect a person is engaged in any Prohibited Practice, You
            shall as soon as reasonably practicable report it to us by e-mailing
            us or telephoning Customer Services.<br />
            12.3 You agree that You shall not participate in or be connected with
            any form of Prohibited Practice in connection with Your access to or
            use of the Services.<br />
            12.4 If:<br />
            12.4.1 We have reasonable grounds to believe that You have participated
            in or have been connected with any form of Prohibited Practice (and the
            basis of our belief shall include the use by us (and by our gaming partners
            and our other suppliers) of any fraud, cheating and collusion detection
            practices which are used in the gambling and gaming industry at the relevant
            time); or<br />
            12.4.2 We become aware that You have “charged back” or denied any of
            the purchases or deposits that You made to Your Account; or<br />
            12.4.3 In our reasonable opinion your continued use of the Services may
            be detrimental to our regulated status, including our continued ability
            to be licensed by the Gambling Commission and/or the Gibraltar Gambling
            Commissioner; or<br />
            12.4.4 You become bankrupt or suffer analogous proceedings anywhere in
            the world, then, (including in connection with any suspension and/or
            termination of Your Account) we shall have the right, in respect of Your
            Account (and/or any other account held by You with an Operator Group
            company) to withhold the whole or part of the balance and/or recover
            from the account the amount of any deposits, pay-outs, bonuses or winnings
            which have been affected by or are in any way attributable to any of
            the event(s) contemplated in this paragraph 12.4. The rights set out
            in this paragraph 12.4 are without prejudice to any other rights (including
            any common law rights) that we may have against You, whether under the
            Terms of Use or otherwise<br />
            12.5 For the purposes of this paragraph:<br />
            12.5.1 “fraudulent practice” means any fraudulent activity engaged in
            by You or by any person acting on Your behalf or in collusion with You,
            and shall include, without limitation: (a) fraudulent charge-backs and
            rake-back activity; (b) the use by You or any other person who was participating
            in the same game as You at any time, of a stolen, cloned or otherwise
            unauthorized credit or debit card, as a source of funds; (c) the collusion
            by You with others in order to gain an unfair advantage (including through
            bonus schemes or similar incentives offered by us); (d) any attempt to
            register false or misleading account information; and (e) any actual
            or attempted act by You which is reasonably deemed by us to be illegal
            in any applicable jurisdiction, made in bad faith, or intended to defraud
            us and/or circumvent any contractual or legal restrictions, regardless
            of whether such act or attempted act actually causes us any damage or
            harm;<br />
            12.5.2 “Criminal activity” shall include, without limitation, money laundering
            and any other offence<br />
            12.5.3 “Unfair advantage” shall include, without limitation:<br />
            12.5.3.1 The exploitation of a fault, loophole or error in our or any
            third party’s software used by You in connection with the Services (including
            in respect of any game);<br />
            12.5.3.2 The use of any Bots for skill games (including but not limited
            to, those skill games appearing under the Skill tab or Games tab) and
            Bots for any other use which would otherwise constitute any other Prohibited
            Practices;<br />
            12.5.3.3 The use of third party software or analysis systems; or<br
            />
            12.5.3.4 The exploitation by You, of an Error as defined in paragraph
            19.1 below, in any case either to Your advantage and/or to the disadvantage
            of us or others.<br />
            12.6 In exercising any of our rights under paragraph 12.4 in relation
            to a Prohibited Practice, we shall use all reasonable endeavors to ensure
            that, while complying with our regulatory and other legal obligations,
            we exercise such rights in a manner which is fair to You and to our other
            customers.<br />
            12.7 We reserve the right to inform relevant authorities, other online
            gaming or gambling operators, other online service providers and banks,
            credit card companies, electronic payment providers or other financial
            institutions of Your identity and of any suspected Prohibited Practice
            by You, and You shall cooperate fully with us to investigate any suchactivity.
            <br />
            CLOSURE OF YOUR ACCOUNT; TERMINATION OF THE TERMS OF USE <br />
            CLOSURE AND TERMINATION BY YOU <br />
            13.1 Provided that Your Account does not show that a balance is due to
            us, You are entitled to close Your Account and terminate the Terms of
            Use on not less than twenty four hours’ notice to us at any time, by
            contacting us through Customer Services, details of which can be found
            in the Contact Us and Help section of the Website: <br />
            13.1.1 Indicating Your wish to close Your Account; and <br />
            13.1.2 Stating the reasons why You wish to close Your Account, in particular
            if You are doing so because of concerns over the level of Your use of
            the same. <br />
            We will respond to Your request, confirming closure of Your Account and
            the date on which such closure will be effective, within a reasonable
            time, provided that You continue to assume responsibility for all activity
            on Your Account until such closure has been carried out by us (at which
            point the Terms of Use shall terminate). <br />
            13.2 When You request closure of Your Account under paragraph 13.1 we
            will, subject to paragraph 13.3, return any outstanding balance in Your
            Account to You. <br />
            13.3 Upon any termination of Your Account under this paragraph 13 we
            shall be entitled (without limiting our rights under paragraph 13.6)
            to withhold, from the repayment of the outstanding balance on Your Account,
            any money: (a) pursuant to paragraph 12 (Collusion, Cheating, Fraud and
            Criminal Activity); (b) pursuant to paragraph 20 (Breach of the Terms
            of Use); (c) as otherwise provided by the Terms of Use (including, as
            appropriate, paragraph 5.4); or (d) as required by law or regulation.
            <br />
            13.4 When repaying the outstanding balance on Your Account, we shall
            use the same method of payment which You provided upon registration of
            Your Account, or such other payment method as we may reasonably select.
            <br />
            13.5 Where You have closed Your Account, we may in certain circumstances
            be able to re-open Your Account with the same account details as before
            if You request us to do so. In such circumstances, while Your Account
            will have the same account details as before, it will be subject to the
            Terms of Use which are in force at the date of any such reopening and
            any prior entitlements (including, but without limitation, to bonuses
            or contingent winnings) will no longer be valid. <br />
            CLOSURE AND TERMINATION BY US <br />
            13.6 We are, at any time (and notwithstanding any other provisions contained
            in the Terms of Use), entitled to close Your Account and terminate the
            Terms of Use on written notice (or attempted notice) to You using Your
            Contact Details. In the event of any such termination by us we shall,
            subject to paragraph 13.7, as soon as reasonably practicable following
            a request by You, refund the balance of Your Account. <br />
            13.7 Where we close Your Account and terminate the Terms of Use pursuant
            to paragraph 11 (Collusion, Cheating, Fraud and Criminal Activity) or
            paragraph 20 (Breach of the Terms of Use), the balance of Your Account
            will be non-refundable and deemed to be forfeited by You to the extent
            of any claim that we may have against You as at the date of such closure
            (whether under Your Account, a Duplicate Account or otherwise). Closure
            of Your Account and Termination of the Terms of Use, other than pursuant
            to paragraphs 11 or 20 of these General Terms, will not affect any outstanding
            bets, provided that such outstanding bets are valid and You are not in
            breach of the Terms of Use in any way. For the avoidance of doubt, we
            will not credit any bonuses into Your Account, nor will You be entitled
            to any contingent winnings, at any time after the date on which it has
            been closed (whether by us pursuant to the Terms of Use, or in response
            to Your request). <br />
            SUSPENSION BY US <br />
            13.8 We shall be entitled to suspend Your Account in the circumstances
            expressly set out in the Terms of Use. Upon the suspension of Your Account:
            (a) no activity shall be permitted (including deposits, withdrawals,
            betting or gaming) until the date upon which it is re-activated by us;
            (b) no bonuses or contingent winnings will be credited to the Account;
            and (c) we shall address the issue that has given rise to the Account
            suspension with a view to resolving it as soon as reasonably practicable
            so that the Account can, as appropriate, either be re-activated or closed.
            ACCESS TO, AND USE OF, THE SERVICES <br />
            14.1 You are solely responsible for the supply and maintenance of all
            of Your Access Devices and related equipment and telecommunications networks
            and internet access services that You need to use in order to access
            the Services. We will not be liable in any way whatsoever for any losses
            caused to You (whether resulting from loss of service, poor internet
            connectivity, insufficient bandwidth or otherwise) by the internet or
            any telecommunications service provider that You have engaged in order
            to access the Services. For the avoidance of doubt, the Operator does
            not make any representation or give any warranty as to the compatibility
            of the Services with any particular third party software or hardware,
            including (for the avoidance of doubt) third party analysis or ‘Bot’
            programmers which promise certain results from any of the Services.
            <br />
            14.2 Under no circumstances should You use the Services for any purpose
            which is or is likely to be considered to be defamatory, abusive, obscene,
            unlawful, of a racist, sexist or other discriminatory nature, or which
            could cause offence. You must not use any abusive or aggressive language
            or images, swear, threaten, harass or abuse any other person, including
            other users, via the Website, or attempt to pass Yourself off as being
            any other person, or behave in such a manner towards any Operator staff
            used to provide the Services, Customer Services, or any helpdesk or support
            function which we make available to You. <br />
            14.3 You shall use the Website for personal entertainment only and shall
            not be allowed to provide access or reproduce the Website or any part
            of it in any form whatsoever without our express consent, including creating
            links to it. 14.4 You shall be solely liable in respect of any content
            uploaded by You onto the Website (“Uploaded Content”) and, in uploading
            any such content, You represent and warrant that: <br />
            14.4.1 You have obtained all necessary approvals, consents, licenses
            and permissions required in respect of the Uploaded Content and that
            the reproduction of the Uploaded Content on the Website will not infringe
            the copyright, trade mark, confidential information or any other intellectual
            property rights whatsoever of any third party; <br />
            14.4.2 The Uploaded Content will not contain any material in breach of
            paragraph 14.2 or any code in breach of paragraph 14.3; <br />
            14.4.3 The Uploaded Content will comply with all laws and regulations
            (including, in particular, those relating to data protection and privacy);
            and <br />
            14.4.4 The Operator is entitled to use and sub-license the use of the
            Uploaded Content at its sole discretion. <br />
            14.5 Any material (other than Software under paragraph 16) downloaded
            by You from the Website shall be downloaded entirely at Your own risk
            and the Operator shall not be liable in respect of any loss of data or
            other damage caused by any such download. <br />
            14.6 Where we have reason to believe that Your use of the Services is
            in breach of any of paragraphs we shall, without prejudice to any of
            our other rights, be entitled forthwith to remove from the Website any
            offending content. <br />
            BETTING AND GAMING TERMS <br />
            15.1 Expressions used in the betting and gaming industry are numerous.
            Where appropriate, a glossary explaining the meaning of commonly used
            betting and gaming expressions is available in the Help section of the
            Website. Should You be in any doubt as to the meaning of any expression,
            You should: <br />
            15.1.1 look up its meaning in the Help section relating to the event
            or game You are betting or gaming on; <br />
            15.1.2 If You are still in any doubt, contact Customer Services for clarification;
            and <br />
            15.1.3 Not place any bet or game on any event until its meaning is understood
            to Your satisfaction, <br />
            Because we cannot accept any responsibility if You place a bet or game
            via the products offered via the Services in circumstances where You
            do not understand any of the terms involved in or relating to the bet
            or game. <br />
            ALTERATION OF THE WEBSITE <br />
            We may, in our absolute discretion, alter or amend any product or service
            (including any prices offered) available through the Website at any time
            for the purpose of ensuring the ongoing provision of the Website, but
            without prejudice to any games and/or bets already in progress at the
            time of such amendment. From time to time, we may restrict You from accessing
            some parts of the Website for the purpose of maintenance of the Website
            and/or alteration or amendment of any of the games and/or products available
            through the Website. <br />
            THIRD PARTY SOFTWARE <br />
            17.1 In order to use the products offered through the Services, You may
            be required to download and install software supplied by third parties
            on to Your Access Device (“Software”). Software may include, but is not
            limited to: Access Device applications, our download Casino and Poker
            products and any promotional, marketing and/or facility applications,
            products and software. <br />
            17.2 In such circumstances, You may be required to enter into a separate
            agreement with the owner or licensor of such Software in respect of Your
            use of the same (a “Third Party Software Agreement”). In case of any
            inconsistency between the Terms of Use and any Third Party Software Agreement,
            the Terms of Use will prevail in so far as the inconsistency relates
            to the relationship between You and the Operator. <br />
            17.3 It is Your responsibility to ensure that any Software is downloaded
            onto Your Access Device in a manner compatible with Your own Access Device’s
            specific set-up. For the avoidance of doubt, we shall not be liable to
            the extent that the incorrect downloading of any Software has an adverse
            effect on the operation of Your Access Device. <br />
            17.4 Notwithstanding that the Services provided via any Access Device
            application shall be subject to the Terms of Use, the terms under which
            any application (“App”) is downloaded or installed onto Your Access Device
            shall be governed by the agreement entered into between You and the supplier
            of the relevant App but, in case of any inconsistency between the Terms
            of Use and any such agreement, the Terms of Use will prevail in so far
            as the inconsistency relates to the relationship between You and the
            Operator. <br />
            USE OF SPECIAL SOFTWARE (AI) <br />
            18.1 In the event of systems or communications errors relating to the
            generation of any result, bet settlement or any other element of a Game,
            we will not be liable to you as a result of any such errors and we reserve
            the right to void all related bets and plays on the Game in question.
            <br />
            18.2 In the event that a system malfunction results in profit, whether
            it is collected or credited to your account, we reserve the right to
            claim all gains that you may have benefited from, as a result of one
            of those malfunctions, and you would be obliged to immediately reimburse
            the amount collected and inform us of the malfunction. We reserve the
            right, at our sole discretion, to directly deduct an amount equal to
            that which you may have received in error from your account. <br />
            18.3 Disconnection, Misuse and Malfunction <br />
            18.3.1 We, our affiliates, agents and licensors accept no responsibility
            and will not be liable for any loss resulting from delays or interruptions
            to play due to failure, breakdown, malfunction, interruption of or disconnection
            from the games server or any other causes over which we or they have
            no control. <br />
            18.3.2 Misuse, disconnection or system malfunction voids all bets, plays
            and pays. <br />
            18.3.3 You certify that in what pertains to the services provided by
            us, you will not use or attempt to use any strategy that takes advantage
            of any software bug or failure and to not use or attempt to use artificial
            intelligence to get any advantage while playing. <br />
            18.3.4 In the event that we reasonably determine that you used or attempted
            to use a product endowed with artificial intelligence in conjunction
            with our Website or services, we reserve the right to rescind or block
            your account immediately, to not reimburse the amount credited to your
            account, and prohibit your access to all other Websites, Services and
            Applications offered by us. <br />
            18.3.5 Should we have any reason to believe that either an account or
            group of accounts are operating systematically, e.g. using specific betting
            techniques or group wagering, we reserve the right to block or permanently
            close all accounts. In these circumstances, we will not be under any
            obligation to refund you any money in your account, with the exception
            of the amount you originally deposited, should this amount still be present.
            <br />
            ERRORS OR OMISSIONS <br />
            19.1 A number of circumstances may arise where a bet or wager is accepted,
            or a payment is made, by us in error. A non-exhaustive list of such circumstances
            is as follows: <br />
            19.1.1 Where we mis-state any odds or terms of a bet or gaming wager
            to You as a result of obvious error or omission in inputting the information
            or setting up a market, or as a result of a computer malfunction;
            <br />
            19.1.2 Where we have made a ‘palpable error’. A palpable error occurs
            where: <br />
            19.1.2.1 In relation to bets placed prior to an event taking place, the
            prices/terms offered are materially different from those available in
            the general market; or <br />
            19.1.2.2 In relation to any event, the price/terms offered at the time
            the bet is placed are clearly incorrect given the probability of the
            event occurring; <br />
            19.1.3 Where we have continued to accept bets on a market which should
            have been suspended, including where the relevant event is in progress
            (except where ‘in-running’ bets are accepted) or had already finished
            (sometimes referred to as ‘late bets’); <br />
            19.1.4 Where an error has been made as a result of a Prohibited Practice
            under paragraph 12.1; <br />
            19.1.5 Where we should not have accepted, or have the right to cancel
            or re-settle, a bet pursuant to the Betting Rules (for example due to
            ‘Related Contingencies’); <br />
            19.1.6 Where an error is made by us as to the amount of winnings/returns
            that are paid to You, including as a result of a manual or computer input
            error; or <br />
            19.1.7 Where an error has been made by us as to the amount of free bets
            and/or bonuses that are credited to Your Account, any such circumstances
            being referred to as an “Error”. <br />
            19.2 We reserve the right to: <br />
            19.2.1 Correct any Error made on a bet placed and re-settle the same
            at the correct price or terms which were available or should have been
            available through the Operator (absent the publishing error) at the time
            that the bet was placed and the bet will be deemed to have taken place
            on the terms which were usual for that bet; or <br />
            19.2.2 Where it is not reasonably practicable to correct and re-settle
            under 19.2.1 above, to declare the bet void and return Your stake into
            Your Account; or <br />
            19.2.3 In circumstances where the Error has resulted from a Prohibited
            Practice <br />
            19.3 Any money which are credited to Your Account, or paid to You as
            a result of an Error shall be deemed, pending resolution under paragraph
            19, to be held by You on trust for us and shall be immediately repaid
            to us when a demand for payment is made by us to You. Where such circumstances
            exist, if You have money in Your Account we may reclaim these money from
            Your Account pursuant to paragraph 7.4. We agree that we shall use all
            reasonable endeavors to detect any Errors and inform You of them as soon
            as reasonably practicable. <br />
            19.4 Neither we (including our employees or agents) nor our partners
            or suppliers shall be liable for any loss, including loss of winnings,
            that results from any Error by us or an error by You. <br />
            19.5 You shall inform us as soon as reasonably practicable should You
            become aware of any Error. <br />
            19.6 Where You have used monies which have been credited to Your Account
            or awarded to You as a result of an Error to place subsequent bets or
            play games, we may cancel such bets and/or withhold any winnings which
            You may have won with such monies, and if we have paid out on any such
            bets or gaming activities, such amounts shall be deemed to be held by
            You on trust for us and You shall immediately repay to us any such amounts
            when a demand for repayment is made by us to You. <br />
            EXCLUSION OF OUR LIABILITY <br />
            20.1 Your access to and use of the Services is at Your sole option, discretion
            and risk. We shall not be liable for any attempts by You to use the Services
            by methods, means or ways not intended by us. <br />
            20.2 We will provide the Services with reasonable skill and care and
            substantially as described in the Terms of Use. We do not make any other
            promises or warranties regarding the Services, or any products or services
            forming a part of the Services, and hereby exclude (to the extent permitted
            by law) all implied warranties in respect of the same (including implied
            warranties as to satisfactory quality and/or fitness for Your purpose).
            In particular, we do not warrant that the Website will have uninterrupted
            availability or that it will be free of bugs, viruses or other errors.
            <br />
            20.3 SAVE AS PROVIDED IN OUR BETTING RULES AND SUBJECT TO PARAGRAPH 20.5,
            OUR MAXIMUM LIABILITY (INCLUDING THAT OF OUR GROUP COMPANIES, AFFILIATES,
            OFFICERS, DIRECTORS, AGENTS AND EMPLOYEES) ARISING OUT OF YOUR USE OF
            THE SERVICES (OR ANY PART OF THE SERVICES AND WHETHER UTILISING THE WEBSITE
            OR TELEBETTING), WHETHER SUCH LIABILITY ARISES UNDER BREACH OF CONTRACT,
            TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, WILL BE LIMITED TO: 20.3.1
            WHERE OUR LIABILITY RELATES TO A BET OR STAKE, THE AMOUNT OF THE BET
            OR STAKE <br />
            PLACED BY YOU IN RESPECT OF WHICH OUR LIABILITY HAS ARISEN; <br />
            20.3.2 WHERE OUR LIABILITY RELATES TO THE MISAPPLICATION OF FUNDS, THE
            AMOUNT OF MONEY IN YOUR ACCOUNT THAT HAS BEEN MISPLACED BY US; AND
            <br />
            20.3.3 IN RESPECT OF ANY OTHER LIABILITY OF THE OPERATOR, ……… ($… ...
            ). <br />
            20.4 WE (INCLUDING OUR GROUP COMPANIES, AFFILIATES, OFFICERS, DIRECTORS,
            AGENTS AND EMPLOYEES) SHALL NOT BE LIABLE TO YOU, WHETHER SUCH LIABILITY
            ARISES IN CONTRACT, TORT (INCLUDING NEGLIGENCE) OR OTHERWISE, IN RESPECT
            OF ANY: <br />
            20.4.1 LOSS OF DATA; <br />
            20.4.2 LOSS OF PROFITS; <br />
            20.4.3 LOSS OF REVENUE; <br />
            20.4.4 LOSS OF BUSINESS OPPORTUNITY; <br />
            20.4.5 LOSS OF OR DAMAGE TO GOODWILL OR REPUTATION; <br />
            20.4.6 BUSINESS INTERRUPTION; OR <br />
            20.4.7 ANY INDIRECT, SPECIAL OR CONSEQUENTIAL LOSS OR DAMAGE, EVEN WHERE
            SUCH LOSS OR DAMAGE HAS BEEN NOTIFIED TO US AS BEING POSSIBLE, ARISING
            OUT OF THE TERMS OF USE OR ANY USE WHATSOEVER BY YOU OF THE SERVICES.
            <br />
            20.5 Nothing in the Terms of Use will operate so as to exclude any liability
            which we may have in respect of: <br />
            20.5.1 Fraud (including fraudulent misrepresentation); or <br />
            20.5.2 Death or personal injury caused by our negligence. <br />
            BREACH OF THE TERMS OF USE <br />
            21.1 You will fully indemnify, defend and hold us and our officers, directors,
            employees, agents, contractors and suppliers harmless from and against
            any and all losses, costs, expenses, claims, demands, liabilities and
            damages (including legal fees), however caused, that may arise, whether
            or not reasonably foreseeable, as a result of or in connection with:
            <br />
            21.1.1 The access to and use of the Services by You or by anyone else
            using Your username and password; and/or <br />
            21.1.2 Any breach by You of any of the terms and provisions of the Terms
            of Use. <br />
            21.2 Where You are in breach of the Terms of Use, we may at our sole
            discretion, prior to any suspension or termination of Your Account, notify
            You (using Your Contact Details) that You are in breach, requiring You
            to stop the relevant act or failure to act, and/or requiring You to put
            right an act or fault on Your part and warning You of our intended action
            if You do not do so, provided always that such notification shall not
            be a precondition to any suspension or termination of Your Account.
            <br />
            21.3 We have the right to disable any user identification code or password,
            whether chosen by Your allocated by us, at any time, if in our reasonable
            opinion You have failed to comply with any of the provisions of the Terms
            of Use. <br />
            21.4 In addition to any other remedy available, if You breach any of
            the Terms of Use we shall be entitled to recover from Your Account any
            positive balance to the extent of any amount reasonably claimed against
            You pursuant to paragraph 20.1. INTELLECTUAL PROPERTY RIGHTS <br />
            22.1 All website design, text, graphics, music, sound, photographs, video,
            the selection and arrangement thereof, software compilations, underlying
            source code, software and all other material forming part of the Services
            are subject to copyright and other proprietary rights which are either
            owned by us or used under license from third party rights owners. To
            the extent that any material comprised within the Services may be downloaded
            or printed then such material may be downloaded to a single device only
            (and hard copies may be printed) solely for Your own personal, non-commercial
            use. 22.2 Under no circumstances shall the use of the Services grant
            to You any interest in any intellectual property rights (for example
            copyright, know-how or trade marks) owned by us or by any third party
            whatsoever, other than a personal, non-exclusive, non-sublicensable license
            to use such intellectual property rights in connection with Your personal,
            non-commercial use of the Services pursuant to the Terms of Use.
            <br />
            22.3 No rights whatsoever are granted to use or reproduce any trade marks
            or logos which appear on the Website except as specifically permitted
            in accordance with the Terms of Use. <br />
            22.4 You must not, nor must You allow any other person to copy, store,
            publish, rent, license, sell, distribute, alter, add to, delete, remove
            or tamper with the Website or any part of it in any way or directly or
            indirectly disrupt or interfere (or attempt to disrupt or interfere)
            with or alter the Website, other than in the course of viewing or using
            the Website in accordance with the Terms of Use. <br />
            22.5 All intellectual property rights in the name “Coliseo” , the logos,
            designs, trade marks and other distinctive brand features of the Operator
            and any content provided by the Operator or any third party for inclusion
            on the Website vest in the Operator or the applicable third party. You
            agree not to display or use such logos, designs, trade marks and other
            distinctive brand features in any manner without our prior written consent.
            <br />
            VIRUSES, HACKING AND OTHER OFFENCES <br />
            23.1 You shall not: <br />
            23.1.1 corrupt the Website; <br />
            23.1.2 Attempt to gain unauthorized access to the Website, the servers
            on which the Website is stored or any server, computer or database connected
            to the Website; 23.1.3 Flood the Website with information, multiple submissions
            or “spam”; <br />
            23.1.4 Knowingly or negligently use any features which may affect the
            function of the Website in any way for example (but not limited to) releasing
            or propagating viruses, worms, Trojans, logic bombs or similar material
            that is malicious or harmful; <br />
            23.1.5 Interfere or tamper with, remove or otherwise alter in any way,
            any information in any form which is included on the Website; <br />
            23.1.6 Attack the Website via a denial-of-service attack or a distributed
            denial-of-service attack. We will report any suspected breach of the
            Computer Misuse Act 1990 to the relevant law enforcement authorities
            and we will co-operate with those authorities by disclosing Your identity
            to them. In the event of such a breach, Your right to use the Website
            will cease immediately. <br />
            23.2 We will not be liable for any loss or damage caused by a distributed
            denial-ofservice attack, viruses or other technologically harmful material
            that may infect Your Access Device and related equipment, computer programs,
            data or other proprietary material due to Your use of the Website or
            to Your downloading of any material posted on such Website, or on any
            website linked to the Website. <br />
            YOUR PERSONAL INFORMATION <br />
            24.1 All information on Your Account held by us is securely data warehoused
            and remains confidential except where otherwise stated in the Terms of
            Use (including, for the avoidance of doubt, the Privacy Policy).
            <br />
            24.2 We are required by law (in particular the Data Protection Act 2004)
            to comply with data protection requirements in the way in which we use
            any personal information collected from You in Your use of the Services.
            We therefore take very seriously our obligations in relation to the way
            in which we use Your personal information. <br />
            24.3 Prior to Your use of and when You use the Services it will be necessary
            for us to collect certain information about You, including Your name
            and date of birth, Your Contact Details, and may also include information
            about Your marketing preferences (all of which shall be known as “Your
            Personal Information”). <br />
            24.4 By providing us with Your Personal Information, You consent to our
            processing Your Personal Information, including any of the same which
            is particularly sensitive: 24.4.1 For the purposes set out in the Terms
            of Use (including the Privacy Policy); and <br />
            24.4.2 For other purposes where we need to process Your Personal Information
            for the purposes of operating the Services, <br />
            including by sharing it with our service providers and agents for these
            purposes, for example to our providers of postal services, marketing
            services and Customer Services agents. We may also disclose Your Personal
            Information in order to comply with a legal or regulatory obligation.
            <br />
            24.5 We may retain copies of any communications that You send to us (including
            copies of any emails) in order to maintain accurate records of the information
            that we have received from You. <br />
            USE OF ‘COOKIES’ ON THE WEBSITE <br />
            25.1 The Website uses ‘cookies’ to track Your use of the internet and
            to assist the functionality of the Website. A cookie is a small file
            of text which is downloaded onto Your Access Device when You access the
            Website and it allows us to recognize when You come back to the Website.
            We use cookies for the operation of the Website, including (for example)
            to allow You to remain logged in as You browse between, and use Your
            Account to bet on or play games on, different parts of the Website. We
            also use cookies for our own analytical purposes so that we can identify
            where customers have encountered technical problems on the Website, and
            therefore help us improve our customers’ experience. <br />
            25.2 If You object to cookies or want to delete any cookies that are
            already stored on Your Access Device, we recommend that You follow the
            instructions for deleting existing cookies and disabling future cookies
            on Your file management and internet browsing software. Further information
            on deleting or controlling cookies is available within our Privacy Policy
            or at www.aboutcookies.org. Please note that by deleting our cookies
            or disabling future cookies You may not be able to access certain areas
            or features of the Website. <br />
            COMPLAINTS AND NOTICES <br />
            26.1 No claim or dispute with regard to: <br />
            26.1.1 The acceptance or settlement of a bet which You have made using
            the Services will be considered more than thirty days after the date
            of the original transaction; and <br />
            26.1.2 A game which You have played using the Services will be considered
            more than twelve weeks after the date on which the relevant transaction
            or game play took place. <br />
            26.2 Should You wish to make a complaint regarding the Services, as a
            first step You should, as soon as reasonably practicable, contact Customer
            Services about Your complaint, which will be escalated as necessary within
            our Customer Services team until resolution. <br />
            26.3 If there is a dispute arising from the Terms of Use which cannot
            be resolved by Customer Services having been escalated in accordance
            with paragraph 26.2, You can request that the matter be addressed by
            a manager or supervisor. We will endeavor to resolve the matter to Your
            satisfaction either immediately or by contacting You subsequently.
            <br />
            26.4 You acknowledge that our random number generator will determine
            the outcome of the games played through the Services and You accept the
            outcomes of all such games. You further agree that in the unlikely event
            of a disagreement between the result that appears on Your screen and
            the game server used by the Operator, the result that appears on the
            game server will prevail, and You acknowledge and agree that our records
            will be the final authority in determining the terms and circumstances
            of Your participation in the relevant online gaming activity and the
            results of this participation. <br />
            26.5 When we wish to contact You, we may do so using any of Your Contact
            Details. Notices will be deemed to have been properly served and received
            by You immediately after an email is sent or after we have communicated
            with You directly by telephone (including where we leave You a voicemail),
            or three days after the date of posting of any letter. In proving the
            service of any notice, it will be sufficient to prove, in the case of
            a letter, that such letter was properly addressed, stamped and placed
            in the post; in the case of an email, that such email was sent to the
            specified email address (if any) in Your Contact Details at the time
            that any such email was sent. <br />
            TRANSFER OF RIGHTS AND OBLIGATIONS <br />
            27.1 We reserve the right to transfer, assign, sublicense or pledge the
            Terms of Use (an “assignment”), in whole or in part, to any person without
            notice to You, provided that any such assignment will be on the same
            terms or terms that are no less advantageous to You. <br />
            27.2 Your Rights or obligations under the Terms of Use can not be assigned,
            sublicensed or otherwise transferred in any matter whatsoever EVENTS
            OUTSIDE OUR CONTROL <br />
            28.1 We will not be liable or responsible for any failure to perform,
            or delay in performance of, any of our obligations under the Terms of
            Use that is caused by events outside our reasonable control, including
            (without limitation) any telecommunications network failures, power failures,
            failures in third party computer (or other) equipment, fire, lightning,
            explosion, flood, severe weather, industrial disputes or lock-outs, terrorist
            activity and acts of government or other competent authorities (a “Force
            Majeure Event”). <br />
            28.2 Our performance is deemed to be suspended for the period that the
            Force Majeure Event continues, and we will have an extension of time
            for performance for the duration of that period. We will use our reasonable
            endeavors to bring the Force Majeure Event to a close or to find a solution
            by which our obligations may be performed despite the Force Majeure Event.
            <br />
            WAIVER <br />
            29.1 If we fail to insist upon strict performance of any of Your obligations
            or if we fail to exercise any of the rights or remedies to which we are
            entitled, this shall not constitute a waiver of such rights or remedies
            and shall not relieve You from compliance with such obligations.
            <br />
            29.2 A waiver by us of any default shall not constitute a waiver of any
            subsequent default. <br />
            29.3 No waiver by us of any of the provisions of the Terms of Use shall
            be effective unless it is expressly stated to be a waiver and is communicated
            to You in writing in accordance with paragraph 25 (Complaints and Notices)
            above. <br />
            SEVERABILITY <br />
            30.1 If any of the Terms of Use are determined by any competent authority
            to be invalid, unlawful or unenforceable to any extent, such term, condition
            or provision will to that extent be severed from the remaining terms,
            conditions and provisions which will continue to be valid to the fullest
            extent permitted by law. <br />
            30.2 In such cases, the part deemed invalid or unenforceable shall be
            amended in a manner consistent with the applicable law to reflect, as
            closely as possible, the Operator’s original intent. <br />
            ARBITRATION All disputes which may arise between player and Casino including
            their successors in title under general or special title as a result
            of our Terms and Conditions or as a result of further agreements and
            other acts in connection with our Terms and Conditions shall be settled
            exclusively by arbitration in Curaçao and in accordance with Curaçao
            Civil Procedure Rules. <br />
            ENTIRE AGREEMENT <br />
            31.1 The Terms of Use and any document expressly referred to in them
            represent the entire agreement between You and us and supersede any prior
            agreement, understanding or arrangement between You and us, whether oral
            or in writing. <br />
            31.2 We each acknowledge that neither of us has relied on any representation,
            undertaking or promise given by the other or implied from anything said
            or written in negotiations between us except as expressly stated in the
            Terms of Use. <br />
            31.3 Neither party shall have any remedy in respect of any untrue statement
            made by the other, whether orally or in writing, prior to the date of
            the contract (unless such untrue statement was made fraudulently) and
            the other party’s only remedy shall be for breach of contract as provided
            in the Terms of Use. <br />
            THIRD PARTY RIGHTS <br />
            32.1 With the exception of the Operator’s Group companies, unless these
            Terms of Use expressly state otherwise: <br />
            32.1.1 a person who is not a party to these Terms of Use has no right
            to enforce any of the terms under the Contracts (Rights of Third Parties)
            Act 1999; and <br />
            32.1.2 if a person who is not a party to these Terms of Use is stated
            to have the right to enforce any of its terms under the Contracts (Rights
            of Third Parties) Act 1999, we may rescind or vary these Terms of Use
            at our sole discretion (and any documents entered into pursuant to or
            in connection with it) without Your consent or the consent of that person.
            <br />
            CASINO <br />
            1. Please read the rules provided in the game before you read.
            <br />
            2. There is a lot of different terminologies used in the betting industry.
            If you don’t understand or if you are not sure about the meaning of an
            expression, you should not place a bet in the game until you understand
            what does that expression means. Coliseo will not be responsible for
            bets that were placed by you in the games that use terminology that you
            are not familiar with. <br />
            3. If you start to play, that means that you accept the rules of the
            game you have selected. <br />
            4. It is prohibited to enter into collusion to participate, directly
            or indirectly, in any scheme with any other player in the course of any
            game you participate. <br />
            5. A bet is considered accepted after it has registered on the server
            and has been confirmed online. Registered bets can’t be canceled.
            <br />
            6. Your stake cannot exceed your current account balance. Once a bet
            has been registered, the stake is debited from the account. The winnings
            are credited to your account after the bet has been settled. <br />
            7. No disputes or complaints about the acceptance or settlement of bets
            shall be accepted upon the expiry of 7 (seven) calendar days from the
            date of the transaction. <br />
            8. If you have a complaint regarding the work of the Service, you must
            contact Customer Support as soon as possible. If necessary, your complaint
            will be forwarded and reviewed for the final decision. <br />
            9. You acknowledge that our random number generator (RNG) will determine
            the outcome of the games played through the bookmaker and you accept
            the outcomes of all such games. You agree that in the event of a discrepancy
            between the result that appears on your screen and the result displayed
            on the game server, the result that appears on the game server will prevail.
            You agree and acknowledge that our technical records will be the final
            authority in determining the terms and circumstances of your participation
            in the relevant online gaming activity and the results of this participation.
            <br />
            10. If there are any issues, problems, or queries that might arise, please
            <br />
            contact consulta@coliseosport.com <br />
            PROMOTIONS <br />
            Bonuses <br />
            1. The bonus is a deal between the bookmaker and the customer. The bookmaker
            provides the customer with funds for the game, and the customer takes
            responsibility and agrees to satisfy the wagering requirement before
            requesting the withdrawal of the funds. <br />
            2. Bonuses could have additional terms and requirements, so before activation
            of a bonus, we advise that you read them carefully so you get complete
            information and avoid any misunderstandings. <br />
            3. There can only be one active bonus on an account at any time. Bonuses
            related to deposits are not cumulative. The next bonus will become available
            after an earlier bonus is redeemed or revoked. <br />
            4. Bonuses can only be used by one customer, on one device, at one IP
            address, in one browser. <br />
            5. Bonuses are available only for the players that have fully completed
            personal information in their account. The minimum deposit amount for
            participation in the bonus offer depends on the bonus that is chosen.
            <br />
            6. Unless otherwise stated in specific bonus terms, the maximum cashout
            amount for any NO deposit bonus (Giveaways, freespins...etc) is €50.
            <br />
            7. The bonus and the winnings received from it will be lost or forfeited
            upon the expiry of the bonus. The validity period for the bonus is 30
            (thirty) days from the date of the bonus being issued. <br />
            8. Bonus free spins and their validity will depend on the provider and
            is not subject to regulation by the bookmaker. <br />
            9. Coliseo is entitled to change the terms and conditions of bonuses,
            to suspend or terminate them at any time. <br />
            10. The General Terms and Conditions apply. Wagering Requirement
            <br />
            1. While a bonus is activated you have the right to place bets using
            funds, both on your bonus account and on your main account. Any request
            for withdrawal while there is an active bonus on the account will be
            declined until the wagering requirement is met in full or until you reject
            the bonus. <br />
            2. To redeem the bonus, you need to place a required amount in bets.
            If not stated otherwise, you are required to place bets with the total
            stake equal to the amount of the bonus multiplied a specific number of
            times. The wagering requirement = bonus amount x required number of times.
            <br />
            3. All deposit bonuses must be redeemed by wagering the bonus amount.
            <br />
            4. Money deposits need to be used for gaming activities. All deposits
            need to be wagered at least 1x before asking for a withdrawal.
            <br />
            5. Until the play-through requirements have been met, the maximum bet
            that is allowed to be placed is € 5. <br />
            6. Bonuses are available only for the players that have fully completed
            Different games contribute to a different percentage towards the wagering
            requirements. Slots contribute 100%, while all table games, video poker
            games, live games contribute 5%. <br />
            7. All no deposit bonuses need to be wagered 40x times before they can
            be withdrawn" <br />
            8. If a player tries to withdraw funds when there is an unwagered bonus(es),
            the unwagered bonus fund will be forfeited. <br />
            9. All winnings received from playing using bonus funds and requested
            for withdrawal are to be verified by the Company before the payment is
            processed. Depending on the outcome of the verification, the Company
            reserves the right to request the customer provide their personal data
            and payment method confirmation details. <br />
            Bonus cancellation <br />
            1. Every player can decline all or any individual promotions by contacting
            Customer support at consulta@coliseosport.com <br />
            2. When canceling a bonus, your bonus balance hits 0 (zero) and you do
            not need to meet wagering requirements any longer. <br />
            3. The player can decline to continue meeting bonus wagering requirements.
            If the bonus has been declined after it was partially redeemed, any winnings
            generated while redeeming the bonus will be canceled <br />
            Abuse of bonuses <br />
            1. All offers and bonuses are limited to one person, household, family,
            email address, telephone number, same payment account number (e.g. NETeller,
            credit card, debit card, etc.), IP, or shared computer e.g. public library,
            university, or workplace. <br />
            2. We reserve the right not to pay users using disposable e-mail addresses.
            <br />
            3. When playing with bonus funds it is prohibited to excessively postpone
            any game rounds, namely free spins and bonus games. Failure to comply
            with this rule leads to voiding winnings and forfeit of the active balance
            in the account. <br />
            4. When playing with an active bonus it is prohibited to use strategies
            for completing bonus wagering requirements, including collecting scatters
            to get free spins using the bonus balance and subsequently to receive
            free spins to the real balance. <br />
            5. If we have reasonable grounds to believe that the player is using
            such strategies, then the Administration reserves the right to void all
            the players’ winnings. <br />
            6. When abuse of bonuses by a customer is identified, the bookmaker is
            entitled to apply the following measures to the customer: canceling all
            existing bonuses and bonus winnings; blocking the customer’s account.
            <br />
            7. The player is advised to provide their actual telephone number during
            registration, as the Coliseo might use it to confirm your identity. If
            it is not possible to get in touch with you, Coliseo is entitled to apply
            restrictions on the use of bonuses, as well as to block your account.
            <br />
            Errors or omissions <br />
            1. In the event of malfunction of computer software or hardware which
            is used by us, we will use reasonable endeavors to rectify the problem
            as soon as possible. If such problems cause a game to be interrupted
            to the extent that it cannot be restarted from exactly the same moment
            it is interrupted without irreversible loss of data, we will apply the
            most reasonable and fair policies to this situation (which may include
            reinstating your account balance as it appeared before the last bet was
            logged on te operator’s server immediately prior to the occurrence of
            the problem). <br />
            2. If as a result of an error funds have been credited to your account
            and you use these funds to place bets or to participate in games, we
            may cancel such bets and/or withhold any winnings that were received
            using such funds. If we have paid your winning received from such bets
            or games, the bookmaker is entitled to have them returned. <br />
            3. If you place a bet on a live event, you may not be able to see or
            otherwise obtain the latest information about the event in the relevant
            period of time. The bookmaker is not liable to you for any losses that
            you incur as a result of a delay in the transmission of information relating
            to any event. <br />
            4. You are solely responsible for the speed of your internet connection
            and the state of the equipment you use to access the internet. The bookmaker
            does not accept any liability for any losses that you incur (as a result
            of loss of service, poor internet connection or otherwise) due to the
            internet service providers or telecommunication service providers which
            you use to access the Service. Force majeure events <br />
            1. The bookmaker will not be liable or responsible for any failure to
            perform or delay in performance of any of our obligations under the Terms
            and Conditions that is caused by events outside our reasonable control,
            including, without limitation, interruption in telecommunication networks,
            problems with electricity, problems with computers belonging to third
            parties, fire, lightning, explosions, floods, extreme weather conditions,
            strikes and blockages, terrorist acts, acts of government or other competent
            authorities (“Force Majeure”).v 2. Our performance is deemed to be suspended
            for the Force Majeure period. We will use our reasonable endeavors to
            bring the Force Majeure event to a close or to find a solution by which
            the bookmaker obligations may be performed despite the Force Majeure
            event. <br />
            BETTING RULES <br />
            Article 1 <br />
            If an event is postponed or interrupted the Organizer and the participants
            shall be required to wait until the end of the following calendar day
            (midnight – 00:00h) in local time of the event venue and in case the
            event is played or continued within this time period, the Organizer and
            the participants shall accept the result of the event as valid. If the
            event is postponed, and the new match time is set after such time period,
            the bet on that event shall be declared void and shall be settled with
            the odds of 1.00. This shall apply to all sports events other than tennis,
            for which the bet shall be binding, regardless of the time when the match
            is played or continued. <br />
            Article 2 <br />
            If a sports event is interrupted before its official end, whether the
            bet is deemed valid or not shall depend on the type of the sports event,
            as follows: Sports that may be divided into two half-times (football,
            basketball, handball, water polo, rugby, and similar), sports with a
            pre-determined match duration and consisting of three thirds (hockey
            and similar) and sports that do not have a pre-determined duration, and
            the winner is the side that first win three sets (volleyball and similar);
            In case of interruption of an event (before the official end), at any
            moment during the match and if the event is not continued by the end
            of the following calendar day (midnight – 00:00h) in local time of the
            event venue, all bets that were not concluded at the moment when the
            match was interrupted shall be settled with the odds of 1.00. A bet that
            is not concluded shall be any bet whose result could modify the outcome,
            even theoretically, if the event was played until the end. For all concluded
            bets, the result achieved at the moment when the event was interrupted
            shall be the valid result. A concluded bet (winning or not) shall be
            the one where the result would not affect the outcome of the bet if the
            event was played until the end. <br />
            Tennis: <br />
            If any player retires before the start of the match, all types of bets
            shall be settled with the odds of 1.00. In case the event is interrupted
            at any moment during the match, all bets that were not concluded at the
            moment when the match is interrupted shall be settled with the odds of
            1.00. A bet that is not concluded shall be any bet whose result could
            modify the outcome, even theoretically, if the event was played until
            the end. For all concluded bets, the result achieved shall be the valid
            result. A concluded bet (winning or not) shall be the one where the result
            would not affect the outcome of the bet if the event was played until
            the end. For tennis events, the Organizer and the participants shall
            be required to wait for the match to be continued until the official
            announcement of continuance or cancellation of the match by the competition
            organizer. Racing sports (Formula 1, Moto races, Cycling, Skiing, Athletics
            and similar): If a competitor fails to appear at the start of the race,
            the bets on the contestant shall be declared void and shall be settled
            with the odds of 1.00. If a competitor appears at the start of the race
            and withdraws before the end of the race, all bets on that contestant
            shall be valid. If a contestant takes part in qualifications and fails
            to qualify for the race, all bets on him/her shall be valid and shall
            be deemed as not winning. If a contestant withdraws before the qualifications
            for the race, the bets shall be declared void and shall be settled with
            the odds of 1.00. If a contestant appears at the start and fails to start
            the race, it shall be deemed that he/she has lost the duel unless his/her
            opponent failed to even qualify for the race. If one or both contestants
            withdraw during the race, the winner of the duel shall be the one who
            remained in the race longer. If two contestants drop out of the race
            at the same time, the bet on their duel shall be deemed void and shall
            be settled with the odds of 1. <br />
            In case of postponing or interruption of events on which bets are placed
            in-play (Live bet), the Organizer and the Participants shall be required
            to wait for the events to continue 48 hours after the moment of interruption
            for all bets that were not concluded at the moment of interruption, and
            in case the events are not played during that period they shall deem
            the events postponed and shall settle them with the odds of 1.00 (void).
            <br />Article 3 <br />
            After the end of a sports event or any other uncertain event for which
            betting odds are offered, the Organizer shall be required to publish
            the final outcome of the completed event as soon as possible, and to
            officially accept it within 24 hours after the final outcome is published.
            The 24-hour deadline shall start to run from the moment when the organizer
            of the said event confirms in its report the outcome of the completed
            event, which is the only valid outcome for the said event unless provided
            otherwise in the offer of betting events. If the Participant selects
            several uncertain events, the 24-hour deadline shall start to run as
            of the end of the last event in the ticket. If the betting outcome happens
            to be known in advance, the Organizer shall declare such betting void.
            <br />
            1. These Betting Rules are inseparably linked to our Terms &amp; Conditions,
            of which they form a part, and acceptance of these Betting Rules is a
            prerequisite to account registration. Any capitalized terms used herein
            which are not defined shall take their meaning from the Terms &amp; Conditions.
            <br />
            2. The minimum bet differs between sports. Your maximum amount for a
            bet differs between sports, leagues, and bets. You will see the exact
            value specified in the field where you enter the stake amount when placing
            a bet. We make no guarantee that any bet placed within or for the maximum
            stake shall be accepted. <br />
            3. Coliseo reserves the right to refuse the whole or any part of any
            bet request for any reason and at our sole discretion. Individual bet
            requests may be reviewed and an alternative price or stake offered at
            our sole discretion. <br />
            4. Coliseo accepts bets made online. Bets are not accepted in any other
            form (email, telephone, fax, etc.) and if received will be void, win
            or lose. 5. Coliseo reserves the right to refuse/cancel any bet or part
            of a bet before the game starts and to make ambiguous bets void, without
            providing any justification. <br />
            6. Customers cannot cancel or change a bet once the bet has been placed
            and confirmed. <br />
            7. Bets (excluding live betting) will be accepted until the earlier of
            the advertised start time of the event or its actual start time. If a
            bet is inadvertently accepted which includes an event after its actual
            or advertised start time, unless it is a livebetting event, the match/bet
            will be treated as a non-runner. <br />
            8. We also reserve the right to correct obvious errors with the input
            of betting odds. In such cases, we could apply revised odds for final
            settlement on pre-live betting. <br />
            9. Where we have reason to believe that a bet is placed after the outcome
            of an event is known or after the selected participant or team has gained
            a material advantage (e.g. a score, sending off, etc.) we reserve the
            right to void the bet, win or lose. <br />
            10. Coliseo reserves the right to cancel any bets from customers who
            place money on an event where they are in any way involved, as participants,
            referee, coach, etc. <br />
            11. Coliseo reserves the right to withhold payment and to declare bets
            on an event void if we have evidence that the following has occurred:
            (i) the integrity of the event has been called into question or (ii)
            match rigging has taken place. Evidence may be based on the size, volumes,
            or pattern of bets placed with Coliseo across any or all of our betting
            channels. 12. When an event is canceled, all related bets will be void
            automatically and accounts refunded. <br />
            13. If any match is abandoned due to injury, bad weather, crowd trouble,
            etc. all bets that have already been settled up until the time of abandonment
            will stand. For example: If a football match is abandoned in the second
            half, all bets involving the 1st half will stand. What’s more, if there
            has been a goal scored, the first goalscorer market will stand, but the
            last and any time goal scorer bets will be void. For tennis: if a player
            retires injured in the 3rd set, all bets to win the 1st and 2nd sets
            will stand. <br />
            14. Coliseo does not accept any responsibility for typing, human or palpable
            errors, which lead to obvious price errors. In such cases, all bets will
            be deemed void. <br />
            15. Multiple bets that combine different selections within the same event
            are not accepted where the outcome of one affects or is affected by the
            other. If such a bet is taken in error, the bet will be canceled.
            <br />
            16. Coliseo offers you the ability to bet in-play on a variety of global
            sporting events and while we do make every effort to ensure all live
            betting information is accurate, there may be situations where such information
            is incorrect, due to delays or otherwise. When checking live betting
            odds, live event start times, or any other live event markets, please
            be aware that such information is provided as a guide only and we accept
            no liability for the outcome of any inaccuracies which may occur. It
            is the sole responsibility of the customer to check such information
            is accurate at the time of publication. <br />
            17. Winnings will be credited to <br /> the Customer’s account
            following confirmation of the final result. 18. Coliseo reserves the
            right to void any or all bets made by any person or group of persons
            acting in an attempt to defraud us. <br />
            19. Coliseo reserves the right to void any bet that may have been accepted
            when the account did not have sufficient funds to cover the bet. If an
            account has insufficient funds as a result of a deposit that has been
            canceled by the payment processing party, Coliseo reserves the right
            to cancel any bet that may have been accepted retroactively. <br />
            Fraud and Collusion: <br />
            a) A number of bets may be treated as being one when a Customer places
            multiple copies of the same bet. When this occurs all bets may be voided
            apart from the first bet struck. A number of bets that contain the same
            single selection may be treated as being one. When this occurs all bets
            may be voided apart from the first bet struck. An example would be where
            1 particular selection is repeatedly included in Multiple bets involving
            other short-priced selections. <br />
            b) Where there is evidence of a series of bets each containing the same
            (or very similar) selection(s) having been placed by or for the same
            individual or syndicate or individuals, Coliseo reserves the right to
            make bets void and suspend relevant accounts. This rule applies to both
            settled and unsettled bets. <br />
            c) If you have played in a professional capacity, or in tandem with other
            Customer(s) as part of a club, group, etc., or placed bets or wagers
            in a coordinated manner with other Customer(s) involving the same (or
            materially the same) selections; in this instance we further reserve
            the right, at our sole discretion, to restrict the total maximum payout
            for the combined total of any such bets, to the equivalent of the Maximum
            Daily Payout limit permitted for a single Customer (as outlined at section
            21 above). Coliseo are for sole use on an individual basis and for personal
            entertainment only. <br />
            d) Coliseo allows only one account per person. Any subsequent accounts
            opened under the same postcode/personal details/IP address that are found
            to be related to any existing account may be closed immediately and any
            bets will be voided at Coliseo discretion. Coliseo reserves the right
            to reclaim any winnings attained by these means and we reserve the right
            to withhold all or part of your balance and/or recover from your account
            deposits, payouts, bonuses, any winnings that are attained by these means.
            <br />
            While playing with an active bonus, it is forbidden to be involved in
            activities that give the player a clearly unfair advantage. Such activities
            include, but are not limited to, these: delaying game rounds in any game,
            including free spins and bonus features, to a later time when you have
            no wagering requirements; leaving large bets on the table, for example
            in blackjack, and returning to the game after bonus wagering has been
            completed; playing games with bonus money to build up in-game value;
            lose the bonus funds, and then cash out on the built-up value during
            real-money play; using strategies that take advantage of any software
            bug or failure.
          </p>
        </div>
      {/if}
      {#if selected === "gameres"}
        <div class="help__header--title">Juego Responsable</div>
        <div class="help__body">
          <h6>Controle su juego</h6>
          <p>
            Mientras que la mayoría de la gente juega dentro de sus medios, para
            algunos los juegos de azar pueden convertirse en un problema.
            Publicamos esta sección como un recordatorio para jugar seguro y
            jugar sabio. Queremos que nuestros jugadores se diviertan mientras
            juegan, por lo tanto alentamos el juego responsable. Le ofrecemos la
            posibilidad de definir sus propios límites de juego responsable y
            asistencia para proteger los límites que ha establecido para usted.
            El juego debe ser una experiencia buena y una forma de entretenerse.
            El préstamo de dinero para jugar, el gasto por encima de su
            presupuesto o el uso de dinero asignado para otros fines no sólo es
            imprudente, pero puede llevar a problemas significativos en una
            etapa posterior para usted y los demás a su alrededor. ¡Queremos que
            disfrutes de nuestra página web, así que apuesta responsablemente y
            diviértete!
          </p>
          <h6>Juego de azar para menores de edad</h6>
          <p>
            Debe tener al menos 18 años, o de edad legal para apostar en el país
            en el que reside, para jugar. Controles de verificación de edad
            apropiados se llevan a cabo en todos nuestros negocios para
            asegurarse de que ninguna persona menor de edad juega dentro de
            nuestras instalaciones de juego en vivo. La provisión de información
            incorrecta o deshonesta sobre la edad de un jugador resultará en la
            pérdida de cualquier ganancia y puede resultar en procesamiento
            civil y / o penal.
          </p>
          <h6>Páginas para apostar Betfilter</h6>
          <p>
            Con el fin de proteger a los menores de acceder al sitio, se
            recomienda que los jugadores responsables instalen el software de
            filtrado de internet en sus equipos. Esto proporciona la capacidad
            de controlar el contenido mostrado, bloquear páginas web y
            configurar contraseñas para evitar la presencia de jugadores menores
            de edad. Hay una serie de opciones de software de filtrado de
            internet disponibles. Los siguientes son enlaces a proveedores de
            soluciones reconocidos según lo recomendado por los filtros de
            internet:
          </p>
          <p></p>
          <ul>
            <li>
              <a href="https://www.cyberpatrol.com/" target="_blank"
                >www.cyberpatrol.com</a
              >
            </li>
            <li>
              <a href="https://www.gamblock.com/" target="_blank"
                >www.gamblock.com</a
              >
            </li>
            <li>
              <a href="https://www.netnanny.com/" target="_blank"
                >www.netnanny.com</a
              >
            </li>
            <li>
              <a href="https://www.cybersitter.com/" target="_blank"
                >www.cybersitter.com</a
              >
            </li>
            <li>
              <a href="https://www.safekids.com/" target="_blank"
                >www.safekids.com</a
              >
            </li>
            <li>
              <a href="https://www.websense.com/" target="_blank"
                >www.websense.com</a
              >
            </li>
          </ul>
          <p></p>
          <h6>Prueba de autoevaluación</h6>
          <p>
            Estas preguntas se proporcionan para ayudarle a decidir si usted es
            un jugador compulsivo y quiere dejar de jugar:
          </p>
          <ul>
            <li>¿Alguna vez han criticado sus juegos de azar?</li>
            <li>
              ¿Alguna vez ha mentido para ocultar la cantidad de dinero o tiempo
              que ha apostado?
            </li>
            <li>
              ¿Los argumentos, las frustraciones o las decepciones te hacen
              querer apostar?
            </li>
            <li>¿Usted juega por largos períodos solo?</li>
            <li>
              ¿Te quedas lejos del trabajo, la universidad o la escuela para
              apostar?
            </li>
            <li>¿Juegas para escapar de una vida aburrida o infeliz?</li>
            <li>
              ¿Es usted resistente a gastar 'dinero de juego' en otra cosa?
            </li>
            <li>
              ¿Ha perdido el interés en su familia, amigos o pasatiempos debido
              al juego?
            </li>
            <li>
              Después de perder, ¿cree que debe tratar de recuperar sus pérdidas
              tan pronto como sea posible?
            </li>
            <li>
              Cuando juegas y te quedas sin dinero, ¿te sientes perdido y
              desesperado, y necesitas jugar de nuevo lo antes posible?
            </li>
            <li>¿Juega hasta que se quede sin ni un céntimo?</li>
            <li>
              ¿Ha mentido, robado o prestado sólo para obtener dinero para jugar
              o para pagar las deudas de juego?
            </li>
            <li>¿Se siente deprimido o incluso suicida debido a su juego?</li>
          </ul>
          <p>
            Las personas con un problema de juego compulsivo probablemente
            responderán <strong>SI</strong> a algunas de estas preguntas. Hay muchas
            organizaciones que pueden darle apoyo y asistencia en caso de que desarrolle
            un problema con el juego, y recomendamos que los jugadores se pongan
            en contacto con una organización de autoayuda para obtener ayuda adicional.
            Los siguientes sitios web ofrecen asesoramiento y orientación:
          </p>
          <p></p>
          <ul>
            <li>
              <a href="http://www.gamblersanonymous.org.uk/" target="_blank"
                >www.gamblersanonymous.org.uk</a
              >
            </li>
            <li>
              <a href="http://www.gamblingtherapy.org/" target="_blank"
                >www.gamblingtherapy.org</a
              >
            </li>
            <li>
              <a href="https://www.gamcare.org.uk/" target="_blank"
                >www.gamcare.org.uk</a
              >
            </li>
            <li>
              <a href="https://www.igcouncil.org/" target="_blank"
                >www.igcouncil.org</a
              >
            </li>
          </ul>
          <p></p>
          <h6>Límite de configuración / Autoexclusión</h6>
          <p>
            Para los clientes que disfrutan de los juegos de azar con
            frecuencia, no es raro gastar su presupuesto de vez en cuando.
            Aconsejamos que se hagan planes presupuestarios específicos para
            asegurar que sus gastos de juego sean asequibles. A veces las
            personas niegan el alcance de sus propios problemas y buscan ayuda
            sólo en situaciones de crisis. Pregúntese honestamente y si cree que
            podría tener un problema, establezca el objetivo de detener el juego
            durante dos semanas o un mes como prueba. Si no puede lograr esto,
            podría tener un problema y podría beneficiarse de discutir su
            situación con un consejero. Proporcionamos herramientas para ayudar
            a controlar sus juegos. Puede establecer límites en la cantidad que
            deposita y en la cantidad que puede perder durante un período
            determinado.
          </p>
          <p>
            Puede acceder a <strong>la configuración de la cuenta</strong> para establecer
            su límite o para autoexcluirse.
          </p>
          <p>
            Nuestro <strong>servicio de atención</strong> al cliente estará encantado
            de dar cualquier información adicional requerida.
          </p>
        </div>
      {/if}
      {#if selected === "politica"}
        <div class="help__header--title">Política de Privacidad</div>
        <div class="help__body">
          <h6>OBJETIVO DE ESTA POLÍTICA DE PRIVACIDAD</h6>
          <p>
            Esta Política de Privacidad establece las formas y la manera en que,
            la compañía, puede recopilar y utilizar información personal sobre
            usted.
          </p>
          <p>
            La empresa le ruega que lea detenidamente esta Política de
            privacidad ya que contiene información importante sobre qué esperar
            en cuanto a cómo recopilamos y utilizamos información personal sobre
            usted.
          </p>
          <p>
            A menos que el contexto lo exija de otra manera, los términos en
            mayúsculas no definidos en esta Política de Privacidad serán como se
            definen en las Condiciones Generales, las cuales, para evitar dudas,
            también se aplican y Usted necesitará leer y entender las
            Condiciones Generales además de esta Política de Privacidad.
          </p>
          <h6>QUÉ TIPO DE INFORMACIÓN RECOGEMOS Y USAMOS DE SU INFORMACIÓN</h6>
          <p>
            Sus datos personales (es decir, cualquier información sobre Usted
            desde la cual Usted pueda ser identificado personalmente, como Su
            nombre, dirección, número de teléfono o dirección de correo
            electrónico, y que se menciona en esta Política de Privacidad como
            "Su Información" serán procesados por nosotros (Incluyendo a
            cualquiera de nuestros agentes y / o empleados) y (en su caso)
            cualquier otra empresa de nuestro grupo de empresa y / o nuestros
            socios y subcontratistas, de acuerdo con esta Política de
            Privacidad.
          </p>
          <p>
            Al registrarse como usuario de nuestros Servicios (o completando
            parcialmente el formulario de registro), utilizando los Servicios,
            de lo contrario utilizando la página web, o enviándonos una consulta
            a través de la página web o por teléfono, Usted reconoce que ha
            leído y acepta los Términos de esta Política de Privacidad y que
            Usted consiente al uso de Su información por nosotros y (donde
            corresponda) cualquier otra compañía en nuestro grupo de empresa y /
            o nuestros socios y subcontratistas, de acuerdo con esta Política de
            Privacidad.
          </p>
          <p>
            Si Usted no desea proporcionar Su Información sobre la base
            establecida en esta Política de Privacidad, Usted no debe ingresar
            la información relevante en los espacios proporcionados en ninguna
            parte relevante de nuestra página web, ni proporcionar su
            Información a nosotros por teléfono o de otra manera . Sin embargo,
            si no proporciona dicha información, es posible que no se le permita
            o pueda hacer uso completo de la parte relevante de los Servicios.
          </p>
          <p>
            Si en algún momento desea que dejemos de procesar su información
            para cualquiera de los propósitos establecidos en esta Política de
            privacidad, debe ponerse en contacto con nosotros y tomaremos las
            medidas necesarias para dejar de hacerlo. Tenga en cuenta que esto
            puede significar que su cuenta tendrá que ser cerrada.
          </p>
          <p>
            Tenga en cuenta que si bien los servicios pueden contener enlaces a
            páginas webs y aplicaciones operados por terceros distintos de
            nosotros, no somos responsables de las prácticas de privacidad ni
            del contenido de dichas páginas webs o aplicaciones.
          </p>
          <p>
            Cuando eliga por abrir nuestro sitio o la aplicación de software
            relacionada, el software de notificación también se puede descargar
            en su dispositivo de acceso. Esto nos permite enviarle
            notificaciones sobre nuestros servicios directamente a su
            dispositivo de acceso, por ejemplo, para informarle sobre nuevas
            características, actualizaciones, comunicaciones de servicio,
            ofertas y promociones. Al permitir la apertura de nuestro sitio web
            o servicios, usted acepta recibir notificaciones. Si prefiere no
            recibir estas notificaciones, deberá configurar manualmente la
            notificación desde su Dispositivo de acceso (como la configuración
            de navegador o notificación en el móvil)
          </p>
          <h6>CÓMO UTILIZAMOS SU INFORMACIÓN</h6>
          <p>Recogemos su información con el fin de:</p>
          <ul>
            <li>
              Habilitarnos para configurar su cuenta para que pueda utilizar
              todas las funciones de los servicios, como acreditar su cuenta con
              fondos, realizar apuestas y jugar
            </li>
            <li>
              Permitandonos recibir preguntas y comentarios de usted a través de
              nuestro Centro de ayuda en línea y que podamos responder a ellos
            </li>
            <li>
              Cumplir con las regulaciones pertinentes relativas a su registro,
              por ejemplo, completar los cheques de verificación de edad
            </li>
          </ul>
          <p>
            Además de los propósitos generales identificados en el párrafo 3.1
            anterior, utilizaremos Su Información, incluyendo el intercambio de
            Su Información con nuestros terceros que procesan los datos
            (incluyendo, cuando corresponda, Su Información) en nuestro favor,
            para:
          </p>
          <ul>
            <li>Configuración, operación y administración de su cuenta</li>
            <li>
              Proporcionar cualquiera de los servicios que nos sean solicitados,
              y para cualquier propósito adecuado relacionado con dicha
              provisión
            </li>
            <li>
              Verificación de la exactitud de su información, incluida la
              revelación de dicha información a terceros (incluidas las
              instituciones financieras, la verificación de la edad y las
              agencias de informes de crédito) en relación con tales fines (un
              registro de la búsqueda se conservará y el tercero puede utilizar
              la información Para ayudar a otras compañías con fines de
              verificación)
            </li>
            <li>
              Analizar y registrar su uso de los servicios y las páginas web con
              el fin de mejorar nuestros productos y la forma en que ofrecemos
              los servicios.
            </li>
            <li>
              Preparación y visualización del material y contenido del marketing
              individualizado
            </li>
            <li>
              El envío periódico de comunicaciones por escrito a Usted para
              anunciar importantes cambios de servicio, actualizaciones de
              problemas técnicos y cambios en las Condiciones Generales (que
              incluye esta Política de Privacidad)
            </li>
            <li>
              Cumplir con nuestros deberes regulatorios, obligaciones y
              responsabilidades
            </li>
            <li>
              La investigación de sospechas ilegales, fraudolencias u otros
              impropios relacionados con los servicios.
            </li>
            <li>
              La denuncia de un delito o delito sospechoso, incluido el lavado
              de dinero o cualquier otro fraude
            </li>
            <li>
              Cualquier otro propósito que sea necesario para el cumplimiento de
              nuestras obligaciones contractuales con usted
            </li>
          </ul>
          <p>
            Podemos almacenar y procesar su información en nuestros propios
            sistemas de tecnología de la información o en sistemas propiedad de
            terceros que pueden almacenar y procesar su información en nuestro
            nombre.
          </p>
          <p>
            Nosotros (y cualquier otra empresa en nuestro grupo de la empresa)
            no le enviaremos información no solicitada relacionada con ofertas
            comerciales o anuncios de terceros.
          </p>
          <p>
            Nosotros (y cualquier otra compañía en nuestro grupo de la empresa)
            podemos utilizar su apellido y / o nombre y región para la
            publicidad o los propósitos promocionales.
          </p>
          <p>
            Para fines de prevención o detección de delitos, así como juegos de
            azar responsables, podemos complementar la información que Usted nos
            proporciona con información que recibimos de terceros o recopilar
            mediante el acceso a fuentes de terceros, incluyendo (sin
            limitación) la información publicada en el Internet sobre o por
            Usted, por ejemplo en redes sociales y sitios de redes sociales.
          </p>
          <h6>ACTUALIZACIÓN DE SU INFORMACIÓN</h6>
          <p>
            Puede actualizar o eliminar su información en cualquier momento
            poniéndose en contacto con el Servicio de atención al cliente. Sin
            embargo, se nos puede requerir una copia de un documento de
            validación antes de continuar con la solicitud.
          </p>
          <p>
            Podemos rechazar solicitudes de revelación o eliminación de su
            información que no sean razonables o extremadamente poco razonables
            (por ejemplo, porque requieren un esfuerzo humano o técnico
            desproporcionado o requieren cambios significativos en nuestros
            procesos y tecnología e inciden en nuestra capacidad para
            proporcionar los servicios).
          </p>
          <h6>SEGURIDAD DE INFORMACIÓN</h6>
          <p>
            Nos esforzamos por proteger su información y nuestros servicios de
            acceso no autorizado o alteración de su información. Esto incluye el
            uso de varias medidas de seguridad para proteger Su información en
            poder de nosotros o en nombre de nosotros y la revisión continua de
            nuestras prácticas de procesamiento, almacenamiento y procesamiento
            de información.
          </p>
          <p>
            Sujeto a los usos descritos en esta Política de Privacidad, haremos
            todo lo posible para tratar toda su información con estricta
            confidencialidad y tomar todas las medidas razonables para mantener
            su información personal segura una vez que se transfiera a nuestros
            sistemas. Sin embargo, internet no es un medio seguro y no podemos
            garantizar la seguridad de los datos que divulgue en línea. Usted
            acepta los riesgos de seguridad inherentes de proporcionar
            información y negociar en línea a través de internet y no nos
            considerará responsables por cualquier incumplimiento de seguridad a
            menos que esto se deba a nuestra negligencia o incumplimiento
            voluntario.
          </p>
          <h6>DIRECCIÓN IP</h6>
          <p>
            Su navegador también genera otra información, incluido el idioma en
            el que se muestra la página web y su dirección de protocolo de
            internet ("dirección IP"). Una dirección IP es un conjunto de
            números que se asigna a su ordenador durante una sesión de
            navegación cada vez que inicie sesión en internet a través de su
            proveedor de servicios de internet o su red (si accede a internet
            desde, por ejemplo, un ordenador en el trabajo). Su dirección IP es
            registrada automáticamente por nuestros servidores y utilizada para
            recopilar datos de tráfico sobre los visitantes de nuestra página
            web. También usamos su dirección IP para ayudar a diagnosticar
            problemas con nuestro servidor y para administrar nuestra página
            web. No usamos su dirección IP para identificarlo personalmente.
          </p>
        </div>
      {/if}
      {#if selected === "preguntas"}
        <div class="help__header--title">Preguntas frecuentes</div>
        <div class="help__body">
          <h6>¿Cómo registrarme en la Página Web?</h6>
          <ul>
            <li>
              Entre en la página y haga click en "Registrarse" en la esquina
              superior derecha, rellene el formulario de inscripción con los
              datos personales correctos y envíelo haciendo click en
              "regístrate".
            </li>
          </ul>
          <h6>¿Puedo cambiar mi nombre de usario?</h6>
          <ul>
            <li>
              Desafortunadamente no, el nombre de usuario que ha elegido durante
              el proceso de registro no se puede cambiar.
            </li>
          </ul>
          <h6>¿Datos de iniciar sesión olvidados?</h6>
          <ul>
            <li>
              Para recuperar su contraseña, haga clic en "contraseña olvidada".
              Se puede encontrar en la página de inicio en el apartado de
              "iniciar sesión".
            </li>
          </ul>
          <h6>¿Cómo cambiar la contraseña?</h6>
          <ul>
            <li>
              Entre en su cuenta, vaya al apartado "pérfil del jugador", haga
              click en "cambiar contraseña" y siga los pasos.
            </li>
          </ul>
          <h6>
            Datos personales incorrectos / correo electrónico ¿cómo puedo
            actualizarlos?
          </h6>
          <ul>
            <li>
              En caso de inexactitudes, póngase en contacto con nuestro servicio
              de atención al cliente para recibir el procedimiento correcto.
            </li>
          </ul>
        </div>
      {/if}
      {#if selected === "cash"}
        <div class="help__header--title">Reglas de Cashout</div>
        <div class="help__body">
          <ul>
            <li>
              El retiro está disponible en eventos seleccionados, encuentros y
              mercados, pero la Empresa se reserva el derecho de suspender la
              función de Cashout en cualquier momento.
            </li>
            <li>
              En caso de cambios en las cuotas o la suspensión del mercado, la
              solicitud de Cashout puede no ser exitosa y se puede ofrecer una
              nueva cantidad de dinero.
            </li>
            <li>
              Si se acepta el Cashout con éxito, se mostrará una confirmación y
              la apuesta se liquidará de inmediato, por lo que cualquier
              resultado final de las selecciones no tendrá ningún efecto en el
              monto ofrecido.
            </li>
            <li>
              El monto de Cashout ofrecido es el monto total que se devolverá a
              su cuenta si la solicitud se lleva a cabo con éxito.
            </li>
            <li>
              Cualquier apuesta que se liquide utilizando el Cashout no contará
              para el requisito de apuesta de ninguna oferta.
            </li>
            <li>
              Cualquier apuesta realizada con el dinero de bonificación no será
              elegible para el retiro.
            </li>
            <li>
              La Empresa no puede garantizar que la función Cashout estará
              disponible en su apuesta.
            </li>
            <li>
              En caso de razones técnicas que impidan la disponibilidad de la
              función de Cashout, la Empresa no será responsable y cualquier
              apuesta realizada en ese período de tiempo se considerará válida.
            </li>
            <li>
              La Empresa se reserva el derecho de modificar, suspender o
              eliminar la función de Cashout en cualquier momento para cualquier
              evento, encuentro o mercado. Cualquier apuesta realizada en tales
              eventos, encuentros o mercados será válida.
            </li>
            <li>
              La Empresa se reserva el derecho de revertir la liquidación de un
              Cashout si la apuesta o el mercado se resuelven incorrectamente.
            </li>
            <li>
              La Empresa se reserva el derecho de anular cualquier apuesta
              Cashout si existe algún motivo para creer que la función se ha
              utilizado después de que se conoce un resultado específico o si se
              ha utilizado con intención fraudulenta.
            </li>
          </ul>
        </div>
      {/if}
      {#if selected === "livebet"}
        <div class="help__header--title">Livebetting</div>
        <div id="accordion-help-sub2-3" class="help__body--sub">
          <div
            data-bs-toggle="collapse"
            data-bs-target="#live1"
            aria-controls="live1"
            class="help__header--sub accordion-button collapsed"
          >
            Reglas generales de Apuestas en Vivo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-3"
            id="live1"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Aunque hacemos todo lo posible para asegurarnos de que toda la
              información en Juego sea correcta (como el resultado y la hora del
              juego), deben de ser utilizados como guía y no asumimos ninguna
              responsabilidad en caso de que la información sea incorrecta.
              Tenga en cuenta que el servicio en vivo puede demorarse y que este
              retraso puede variar entre los clientes dependiendo de los
              factores como su conexión o la velocidad de la ISP.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#live2"
            aria-controls="live2"
            class="help__header--sub accordion-button collapsed"
          >
            Aceptación de apuestas en vivo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-3"
            id="live2"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Por el propósito de seguridad e integridad, las apuestas en juego
              (lo que significa un evento que ya ha comenzado) están sujetas a
              un retraso automático antes de la aceptación.
            </p>
            <p>
              Antes de hacer clic en apostar, si el importe cambia en una
              selección, habrá una alerta en su boleta de apuestas. Después de
              hacer clic en apostar, si hay un cambio de importe en una
              selección, y el jugador ha seleccionado la opción de aceptar el
              cambio de importe la apuesta se podrá hacer, aunque si la opción
              no está seleccionada, no se aceptará la apuesta.
            </p>
            <p>
              Un mercado de apuestas puede suspenderse cuando ocurre algo
              importante, o es probable que ocurra, por ejemplo. Un gol, posible
              tarjeta roja, posible penalización, etc. Los mercados de apuestas
              también se pueden suspender debido al tiempo transcurrido en el
              partido, al mercado ya no ser competitivo, o por razones técnicas.
              Los ejemplos anteriores no son exhaustivos y puede haber otras
              razones que no lo sean listado. Si bien un mercado está
              suspendido, no se pueden hacer apuestas y es posible que no esté
              disponible ninguna opción de retiro.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#live3"
            aria-controls="live3"
            class="help__header--sub accordion-button collapsed"
          >
            Fútbol en vivo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-3"
            id="live3"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Todos los eventos de apuestas de fútbol en vivo siempre se basan
              en 90 minutos de juego, a menos que se indique lo contrario, no se
              tendrán en cuenta los tiempos extra, el gol de oro o los tiros de
              penal.
            </p>
            <p>
              Solo los partidos interrumpidos oficialmente serán considerados
              nulos; Si el árbitro señala el final regular antes de que el
              marcador muestre que han transcurrido 90 minutos, el resultado se
              considerará válido.
            </p>
            <p>
              Esta regla no se refiere a los partidos jugados menos de 90
              minutos si esto no se ha indicado debido a un error cometido por
              los operadores de la Compañía.
            </p>
            <p>
              Si la duración del partido no se indica debido a un error evidente
              cometido por la Compañía, todas las apuestas que sigan abiertas al
              final de la primera y la segunda mitad se considerarán nulas.
            </p>
            <p>
              La mayoría de los mercados seguirán las reglas en la lista de
              definiciones de apuestas con la adición de los siguientes
              mercados:
            </p>
            <h6>¿Quién gana el resto del partido?</h6>
            <p>
              Debe predecir qué equipo ganará el resto del partido a partir del
              momento en que se confirmó la apuesta. Solo los goles marcados
              después de que la apuesta haya sido confirmada contarán (el
              resultado actual se registrará en el detalle de la apuesta).
            </p>
            <h6>Próximo gol</h6>
            <p>
              Tiene que predecir qué equipo marcará el próximo gol. En caso de
              que no haya goles marcados después de que la apuesta haya sido
              confirmada, la selección ganadora será X. El puntaje actual se
              registrará en el detalle de la apuesta.
            </p>
            <h6>¿Qué equipo ha comenzado?</h6>
            <p>Tiene que predecir qué equipo comenzará el partido.</p>
            <h6>1x2 (¡solo TE!)</h6>
            <p>
              Debe predecir el resultado final de los tiempos extras,
              considerando solo los goles marcados durante los tiempos extras.
            </p>
            <h6>Total (¡solo TE!)</h6>
            <p>
              Debe predecir si se marcarán más o menos goles solo durante los
              tiempos extras.
            </p>
            <h6>Quién gana el resto del partido (¡solo TE!)</h6>
            <p>
              Debe predecir qué equipo ganará el resto de los tiempos
              adicionales a partir del momento en que se confirmó la apuesta.
              Solo los goles marcados después de que la apuesta haya sido
              confirmada contarán (el resultado actual se registrará en el
              detalle de la apuesta).
            </p>
            <h6>Próximo gol (¡solo TE!)</h6>
            <p>
              Tiene que predecir qué equipo marcará el próximo gol durante los
              tiempos extra. En caso de que no haya goles marcados después de
              que la apuesta haya sido confirmada, la selección ganadora será X.
              El resultado actual se registrará en el detalle de la apuesta.
            </p>
            <h6>1er / 2do… gol (¡solo OT!)</h6>
            <p>
              Tiene que predecir qué equipo marcará el gol seleccionado durante
              los tiempos extras. En caso de que no haya un gol relacionado con
              el número seleccionado, la selección ganadora será X.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#live4"
            aria-controls="live4"
            class="help__header--sub accordion-button collapsed"
          >
            Baloncesto en Vivo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-3"
            id="live4"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Las apuestas de baloncesto en vivo siempre se basan en el
              resultado final del partido, incluyendo el tiempo extra, a menos
              que se indique lo contrario.
            </p>
            <h6>¿Qué equipo ganará el partido, incluyendo prórrogas? (o HH)</h6>
            <p>Tiene que predecir el resultado final del partido.</p>
            <h6>
              Hándicap asiático para el partido completo, incluyendo prórrogas
              (o Hándicap TC (incluyendo prórrogas) dos opciones)
            </h6>
            <p>
              Tiene que predecir el resultado final del partido o período
              listado, teniendo en cuenta el hándicap dado.
            </p>
            <h6>Hándicap asiático para periodo</h6>
            <p>
              Tiene que predecir el resultado final del período listado teniendo
              en cuenta el hándicap dado.
            </p>
            <h6>Apuesta sin empate para periodo</h6>
            <p>
              Tiene que predecir el equipo que ganará el período listado, sin
              tener en cuenta el resultado anterior. En caso de empate, la
              selección quedará anulada.
            </p>
            <h6>
              Total para el partido completo, incluyendo prórrogas (o más/menos
              TC (incluyendo prórrogas))
            </h6>
            <p>
              Tiene que predecir si habrá más o menos puntos anotados que el
              número indicado.
            </p>
            <h6>Total para período (o más/menos cuarto)</h6>
            <p>
              Tiene que predecir si habrá más o menos puntos anotados durante el
              período listado que el número indicado.
            </p>
            <h6>Par/Impar</h6>
            <p>
              Tiene que predecir si el número total de puntos anotados en un
              partido o en un cuarto listado será par o impar.
            </p>
            <h6>¿Qué equipo gana el tiro al aire?</h6>
            <p>
              Tiene que predecir qué equipo ganará el tiro al aire al comienzo
              del partido.
            </p>
            <h6>¿Qué equipo gana carrera a X puntos?</h6>
            <p>
              Tiene que predecir el primer equipo que alcanzará el número
              especificado de puntos en el partido.
            </p>
            <h6>¿Qué equipo gana carrera a X puntos, primer período?</h6>
            <p>
              Debe adivinar qué equipo será el primero en alcanzar el puntaje
              dado en el primer período.
            </p>
            <h6>¿Qué equipo gana carrera a X puntos, segundo período?</h6>
            <p>
              Debe adivinar qué equipo será el primero en alcanzar el puntaje
              dado en el segundo período.
            </p>
            <h6>¿Qué equipo gana carrera a X puntos, tercero período?</h6>
            <p>
              Debe adivinar qué equipo será el primero en alcanzar el puntaje
              dado en el tercero período.
            </p>
            <h6>¿Qué equipo gana carrera a X puntos, cuarto período?</h6>
            <p>
              Debe adivinar qué equipo será el primero en alcanzar el puntaje
              dado en el cuarto período.
            </p>
            <h6>¿Quién anota el punto X?</h6>
            <p>
              Tiene que predecir qué equipo marcará el punto listado en el
              partido.
            </p>
            <h6>¿Habrá prórrogas?</h6>
            <p>Tiene que predecir si el partido irá a prórrogas.</p>
            <h6>*Resultado final</h6>
            <p>
              Tres resultados posibles: 1 (victoria del equipo local), X
              (empate) y 2 (victoria del equipo visitante).
            </p>
            <h6>*Hándicap asiático</h6>
            <p>
              Tiene que pronosticar el resultado final del partido teniendo en
              cuenta el hándicap dado.
            </p>
            <h6>*Más/Menos</h6>
            <p>
              Tiene que pronosticar si habrá más o menos puntos anotados que el
              número indicado.
            </p>
            <p>
              * En el caso de tiempos adicionales, los puntos obtenidos después
              del cuarto período no serán considerados.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#live5"
            aria-controls="live5"
            class="help__header--sub accordion-button collapsed"
          >
            Tenis en vivo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-3"
            id="live5"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Si un partido de tenis con apuestas en vivo se interrumpe y no
              continúa/finaliza dentro de las 72 horas, todas las apuestas
              abiertas en el momento de la interrupción serán canceladas.
            </p>
            <p>
              Si un jugador es descalificado o se retira, todos los mercados sin
              resolver se considerarán nulos.
            </p>
            <h6>¿Qué jugador ganará el partido?</h6>
            <p>Tiene que predecir el ganador del partido.</p>
            <h6>Resultado Final (en sets - el mejor de 3)</h6>
            <p>
              Debe predecir la puntuación correcta (en sets) en el partido (el
              mejor de 3 sets).
            </p>
            <h6>Resultado Final (en sets - el mejor de 5</h6>
            <p>
              Debe predecir la puntuación correcta (en sets) en el partido (el
              mejor de 5 sets).
            </p>
            <h6>¿Qué jugador ganará el set?</h6>
            <p>Tiene que predecir el ganador del set indicado.</p>
            <h6>Jugador 1 para ganar un set.</h6>
            <p>
              Debe adivinar si el primer jugador indicado ganará al menos un set
              en el partido.
            </p>
            <h6>Jugador 2 para ganar un set.</h6>
            <p>
              Debe adivinar si el segundo jugador indicado ganará al menos un
              set en el partido.
            </p>
            <h6>Desempate en partido</h6>
            <p>Necesita adivinar si se jugará un desempate en el partido.</p>
            <h6>Desempate en set [setN°]</h6>
            <p>
              Debe adivinar si se jugará un desempate en un set particular del
              partido.
            </p>
            <h6>Cualquier set terminará 6:0 o 0:6</h6>
            <p>
              Necesita adivinar si algún set en el partido terminará 6:0 o 0:6.
            </p>
            <h6>Juego [juegoN°] para deuce de set [setN°]</h6>
            <p>
              Necesita adivinar si el resultado en algún momento en el juego
              dado será 40-40.
            </p>
            <h6>Número de sets (el mejor de 3)</h6>
            <p>
              Debe predecir el número correcto de sets que se jugarán (el mejor
              de 3 sets).
            </p>
            <h6>Número de sets (el mejor de 5)</h6>
            <p>
              Debe predecir el número correcto de sets que se jugarán (el mejor
              de 5 sets).
            </p>
            <h6>Número total de juegos</h6>
            <p>
              Debe predecir si habrá más o menos juegos jugados durante el
              partido que el número indicado. Si se va a jugar un súper
              desempate en lugar de un set final, se tendrá en cuenta como un
              solo juego.
            </p>
            <h6>Número total de juegos en el set X</h6>
            <p>
              Debe predecir si habrá más o menos juegos jugados durante el set
              listado que el número indicado.
            </p>
            <h6>Número par/impar de juegos</h6>
            <p>
              Debe predecir si el número total de juegos jugados durante el
              partido será par o impar.
            </p>
            <h6>Número impar/par de juegos en set</h6>
            <p>
              Debe predecir si el número total de juegos jugados durante el set
              listado será par o impar.
            </p>
            <h6>¿Quién gana el juego X del set Y?</h6>
            <p>Tiene que predecir el ganador del juego listado.</p>
            <h6>¿Qué jugador ganará los juegos x y y de set n?</h6>
            <p>
              Tiene que predecir el ganador de los juegos seleccionados. Si
              ambos jugadores ganan un juego cada uno, la selección ganadora
              será X.
            </p>
            <h6>Puntuación del juego X del set Y</h6>
            <p>
              Debe predecir la puntuación correcta del juego seleccionado (por
              ejemplo, "Jugador 1 a 0" significa que el jugador 1 ganará el
              juego y el jugador 2 terminará el juego con 0; "Jugador 1 a 15"
              significa que el jugador 1 ganará el juego y el jugador 2
              terminará el juego con 15, etc.).
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#live6"
            aria-controls="live6"
            class="help__header--sub accordion-button collapsed"
          >
            Voleibol en vivo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-3"
            id="live6"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Las apuestas relacionadas con los partidos de voleibol en vivo
              siempre se basan en el resultado final en sets "el mejor de 5"), a
              menos que se indique lo contrario.
            </p>
            <p>
              En caso de que un partido de voleibol se interrumpa antes del
              final, todas las apuestas que estén abiertas en el momento de la
              interrupción serán canceladas.
            </p>
            <h6>¿Qué equipo ganará el partido?</h6>
            <p>Tiene que predecir qué equipo ganará el partido.</p>
            <h6>¿Qué equipo ganará el set?</h6>
            <p>Tiene que predecir qué equipo ganará el set especificado.</p>
            <h6>Hándicap Asiático</h6>
            <p>
              El resultado de la apuesta con hándicap se obtiene sumando el
              hándicap al total de puntos anotados por cada equipo en el partido
              (o restando). El signo (+ o -) y la cantidad de puntos anotados en
              el partido total deben ser considerados.
            </p>
            <h6>Hándicap asiático para el periodo X</h6>
            <p>
              El resultado de la apuesta con hándicap se obtiene sumando el
              hándicap al total de puntos anotados por cada equipo en el set
              especificado (o restando). El signo (+ o -) y la cantidad de
              puntos anotados durante el set especificado deben ser
              considerados.
            </p>
            <h6>¿Qué equipo gana carrera a X puntos, Y set?</h6>
            <p>
              Debe predecir el primer equipo que alcanzará el número de puntos
              especificado en el set especificado.
            </p>
            <h6>¿Quién anota el punto X del set X?</h6>
            <p>
              Tiene que predecir qué equipo anotará el punto listado en el set
              especificado.
            </p>
            <h6>Resultado Final (en sets - el mejor de 5)</h6>
            <p>
              Tiene que predecir la puntuación correcta (en sets) del partido.
            </p>
            <h6>Número de sets (el mejor de 5)</h6>
            <p>
              Tiene que predecir cuántos sets se jugarán exactamente (3, 4 o 5)
            </p>
            <h6>Total</h6>
            <p>
              Debe predecir si habrá más o menos puntos anotados durante todo el
              partido que el número indicado.
            </p>
            <h6>Total para el periodo X</h6>
            <p>
              Debe predecir si habrá más o menos puntos anotados durante el set
              especificado que el número indicado.
            </p>
            <h6>Par/Impar para el periodo X</h6>
            <p>
              Debe predecir si el número total de puntos anotados durante el set
              especificado será par o impar.
            </p>
            <h6>¿Cuántos sets superarán el límite de puntuación?</h6>
            <p>
              Debe predecir cuántos sets tendrá un número más alto de puntos
              anotados por el ganador del set que el número regular (25 puntos
              para los primeros 4 sets, 15 puntos para partidos de desempate,
              etc.), debido a la regla del margen de puntos.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#live7"
            aria-controls="live7"
            class="help__header--sub accordion-button collapsed"
          >
            Hockey sobre hielo en vivo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-3"
            id="live7"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Las apuestas en vivo en el hockey (excepto en los mercados de
              período, prórrogas y penaltis) se consideran solo para el tiempo
              regular a menos que se indique lo contrario en el nombre del
              mercado.
            </p>
            <p>
              En caso de que se interrumpa un partido de hockey antes del final,
              todas las apuestas que estén abiertas en el momento de la
              interrupción serán canceladas.
            </p>
            <h6>3 opciones</h6>
            <p>Tiene que predecir el resultado final del partido.</p>
            <h6>Total</h6>
            <p>
              Debe predecir si habrá más o menos goles marcados con respecto al
              número de referencia indicado.
            </p>
            <h6>Hándicap</h6>
            <p>
              Tienes que predecir el resultado final del partido teniendo en
              cuenta el hándicap dado.
            </p>
            <h6>Apuesta sin empate</h6>
            <p>
              Tiene que predecir qué equipo ganará el partido. En caso de
              empate, la selección quedará anulada.
            </p>
            <h6>Doble oportunidad (1X – 12 – X2)</h6>
            <p>
              En este caso, los tres resultados posibles 1, X, 2 se combinan en
              tres grupos 1X, 12 y X2.
            </p>
            <h6>Próximo gol</h6>
            <p>
              Tienes que predecir qué equipo marcará el próximo gol. En caso de
              que no haya goles marcados después de que la apuesta haya sido
              confirmada, la selección ganadora será X. La puntuación actual se
              registrará en el detalle de la apuesta.
            </p>
            <h6>¿Quién gana el resto del partido?</h6>
            <p>
              Debe predecir qué equipo ganará el resto del partido a partir del
              momento en que se confirmó la apuesta. Solo los goles marcados
              después de que la apuesta haya sido confirmada se consideran (la
              puntuación actual se registrará en el detalle de la apuesta).
            </p>
            <h6>¿Quién gana el período?</h6>
            <p>
              Debe predecir el resultado del período específico (primero,
              segundo, tercer período).
            </p>
            <h6>Goles equipo local</h6>
            <p>
              Tiene que predecir el número exacto de goles marcados por el
              equipo local.
            </p>
            <h6>Goles equipo visitante</h6>
            <p>
              Tiene que predecir el número exacto de goles marcados por el
              equipo visitante.
            </p>
            <h6>Total equipo local</h6>
            <p>
              Debe predecir si el equipo local marcará más o menos goles con
              respecto al número de referencia indicado.
            </p>
            <h6>Total equipo visitante</h6>
            <p>
              Debe predecir si el equipo visitante marcará más o menos goles con
              respecto al número de referencia indicado.
            </p>
            <h6>Par/Impar</h6>
            <p>
              Se debe adivinar si el número total de goles marcados en el
              partido será par o impar. Un resultado de 0-0 se considera par.
            </p>
            <h6>Resultado Exacto</h6>
            <p>Tiene que predecir el resultado exacto del partido.</p>
            <h6>Total para el primer período</h6>
            <p>
              Tiene que predecir si habrá más o menos goles marcados en el
              primer período que el número de referencia indicado.
            </p>
            <h6>Total para el segundo período</h6>
            <p>
              Tiene que predecir si habrá más o menos goles marcados en el
              segundo período que el número de referencia indicado.
            </p>
            <h6>¿Quién gana el resto del primer período?</h6>
            <p>
              Debe predecir qué equipo ganará el resto del primer período a
              partir del momento en que se confirmó la apuesta. Solo se
              consideran los goles marcados después de que se haya confirmado la
              apuesta (la puntuación actual se registrará en el detalle de la
              apuesta).
            </p>
            <h6>¿Quién gana el resto del segundo período?</h6>
            <p>
              Debe predecir qué equipo ganará el resto del segundo período a
              partir del momento en que se confirmó la apuesta. Solo se
              consideran los goles marcados después de que se haya confirmado la
              apuesta (la puntuación actual se registrará en el detalle de la
              apuesta).
            </p>
            <h6>
              ¿Qué equipo ganará el partido, incluyendo prórrogas y penaltis?
            </h6>
            <p>
              Tiene que predecir qué equipo ganará el partido, incluyendo
              prórrogas y penaltis.
            </p>
            <h6>¿Quién gana el resto del partido (¡solo TE!)?</h6>
            <p>
              Debe predecir qué equipo ganará el resto de las prórrogas a partir
              del momento en que se confirmó la apuesta. Solo se consideran los
              goles marcados después de que la apuesta haya sido confirmada (la
              puntuación actual se registrará en el detalle de la apuesta).
            </p>
            <h6>Próximo gol (¡solo TE!)</h6>
            <p>
              Tiene que predecir qué equipo marcará el próximo gol durante las
              prórrogas. En caso de que no haya goles marcados después de que la
              apuesta haya sido confirmada, la selección ganadora será X. La
              puntuación actual se registrará en el detalle de la apuesta.
            </p>
            <h6>¿Qué equipo ganará la tanda de penaltis?</h6>
            <p>Tiene que predecir qué equipo ganará la tanda de penaltis.</p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#live8"
            aria-controls="live8"
            class="help__header--sub accordion-button collapsed"
          >
            Balonmano en vivo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-3"
            id="live8"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Las apuestas en vivo en el balonmano se consideran solo por tiempo
              regular, a menos que se indique lo contrario en el nombre del
              mercado.
            </p>
            <h6>Resultado Final (3 opciones)</h6>
            <p>Tiene que predecir el resultado final del partido.</p>
            <h6>Hándicap (3 opciones)</h6>
            <p>
              Tiene que predecir el resultado final del partido teniendo en
              cuenta el hándicap dado.
            </p>
            <h6>Total</h6>
            <p>
              Tiene que predecir si habrá más o menos goles marcados durante
              todo el partido que el número indicado.
            </p>
            <h6>Medio tiempo – 3 opciones</h6>
            <p>Tiene que predecir el resultado de la primera mitad.</p>
            <h6>Hándicap para el primer tiempo.</h6>
            <p>
              Tiene que predecir el resultado final de la primera mitad teniendo
              en cuenta el hándicap dado.
            </p>
            <h6>Medio tiempo – Total</h6>
            <p>
              Debe predecir si habrá más o menos goles marcados en la primera
              mitad que el número de referencia indicado.
            </p>
            <h6>Hándicap Asiático (2 opciones)</h6>
            <p>
              Tiene que predecir el resultado final del partido teniendo en
              cuenta el hándicap dado.
            </p>
            <h6>Hándicap asiático primera mitad (2 opciones)</h6>
            <p>
              Tiene que predecir el resultado final de la primera mitad teniendo
              en cuenta el hándicap dado.
            </p>
            <h6>¿Quién anota el punto X?</h6>
            <p>Tiene que predecir qué equipo marcará el gol indicado.</p>
            <h6>¿Qué equipo gana la carrera a X puntos?</h6>
            <p>
              Tiene que predecir el primer equipo que alcanzará el número
              especificado de goles en el partido.
            </p>
            <h6>Par/Impar</h6>
            <p>
              Se debe adivinar si el número total de goles marcados en el
              partido será par o impar.
            </p>
            <h6>Par/Impar para primera mitad</h6>
            <p>
              Se debe adivinar si el número total de goles marcados en la
              primera mitad será par o impar.
            </p>
            <h6>Márgenes ganadores, balonmano</h6>
            <p>
              Predeterminada gama de goles por el que gana un equipo (por
              ejemplo, EL gana por&gt; 10; 6-10; 1-5; 0; EV gana por 1-5;
              6-10;&gt; 10).
            </p>
          </div>
        </div>
      {/if}
      {#if selected === "deportes"}
        <div class="help__header--title">Reglas Deportivas</div>
        <div id="accordion-help-sub2-2" class="help__body--sub">
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule1"
            aria-controls="rule1"
            class="help__header--sub accordion-button collapsed"
          >
            Fútbol americano
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule1"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de las apuestas de fútbol americano se considera en
              el resultado final, incluyendo los posibles tiempos adicionales.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 24 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule2"
            aria-controls="rule2"
            class="help__header--sub accordion-button collapsed"
          >
            Anticipadas
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule2"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Las apuestas anticipadas se refieren a una competición completa o
              fase de la misma.
            </p>
            <p>
              En caso de que un jugador o equipos se retiren antes o durante la
              competición, cualquier apuesta se considerará perdida, a menos que
              se especifique lo contrario. Las apuestas realizadas a otros
              participantes seguirán siendo válidas.
            </p>
            <p>
              Cualquier decisión disciplinaria por parte de los órganos de
              gobierno competentes se tomará en consideración para el resultado.
            </p>
            <p>
              Las apuestas se liquidarán después del primer resultado oficial y
              no se tomará en cuenta ninguna decisión posterior.
            </p>
            <p>
              En caso de un resultado equivalente, las cuotas se dividirán por
              el número de jugadores/equipos que obtienen los mismos resultados.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule3"
            aria-controls="rule3"
            class="help__header--sub accordion-button collapsed"
          >
            Atletismo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule3"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de Atletismo se basa en el primer
              resultado oficial.
            </p>
            <p>
              En caso de que una competición sea oficialmente
              interrumpida/pospuesta, todas las apuestas relacionadas se
              considerarán nulas si la competencia no se reanuda/juega y se
              completa dentro de las 24 horas.
            </p>
            <p>
              En caso de que un participante se retire o sea descalificado,
              cualquier apuesta se considerará como perdedora, a menos que se
              especifique lo contrario. Las apuestas realizadas a otros
              participantes seguirán siendo válidas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule4"
            aria-controls="rule4"
            class="help__header--sub accordion-button collapsed"
          >
            Béisbol
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule4"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de béisbol se basa en el resultado
              final del partido, incluidas las entradas extra.
            </p>
            <p>
              Para propósitos de apuestas, los juegos son oficiales después de
              8.5 entradas de juego, de lo contrario, todas las apuestas se
              considerarán nulas.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 12 horas
              posteriores a la hora oficial de inicio. todas las apuestas nulas
              se liquidaran al dia siguiente a las 24.00 (00.00) horas a partir
              de la hora de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule5"
            aria-controls="rule5"
            class="help__header--sub accordion-button collapsed"
          >
            Baloncesto
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule5"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de las apuestas de baloncesto se basa en el
              resultado final del partido, incluyendo prórrogas.
            </p>
            <p>
              En el caso de un partido en el que es posible un empate y los
              tiempos adicionales se juegan para determinar el equipo que pasa a
              la siguiente ronda, el resultado se basará en el resultado final
              (excluyendo prórrogas).
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule6"
            aria-controls="rule6"
            class="help__header--sub accordion-button collapsed"
          >
            Especiales de baloncesto
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule6"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de las apuestas especiales de baloncesto se basa en
              el rendimiento del jugador (punto/asistencia/rebote /cara a cara)
              durante todo el partido, incluyendo prórrogas.
            </p>
            <p>
              En caso de que un jugador seleccionado no participe, las apuestas
              relacionadas se cancelarán.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule7"
            aria-controls="rule7"
            class="help__header--sub accordion-button collapsed"
          >
            Fútbol de playa
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule7"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de fútbol de playa se basa en el
              resultado final del partido, excluyendo los tiempos extra y los
              penaltis.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule8"
            aria-controls="rule8"
            class="help__header--sub accordion-button collapsed"
          >
            Voleibol de playa
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule8"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de voleibol de playa se basa en el
              resultado final "El mejor de 3 sets".
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule9"
            aria-controls="rule9"
            class="help__header--sub accordion-button collapsed"
          >
            Boxeo &amp; Deportes de combate
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule9"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de boxeo y deportes de combate se basa
              en el primer resultado final oficial.
            </p>
            <p>
              En caso de que un jugador se retire antes del partido, todas las
              apuestas se considerarán nulas. En caso de que un jugador se
              retire durante el partido, el oponente será el ganador.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule10"
            aria-controls="rule10"
            class="help__header--sub accordion-button collapsed"
          >
            Ajedrez
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule10"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de ajedrez se basa en el resultado
              final del partido.
            </p>
            <p>
              En caso de que un jugador se retire antes del partido, todas las
              apuestas se considerarán nulas. En caso de que un jugador se
              retire durante el partido, el oponente será el ganador.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 24 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule11"
            aria-controls="rule11"
            class="help__header--sub accordion-button collapsed"
          >
            Críquet
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule11"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de las apuestas de críquet se basa en el resultado
              final del partido.
            </p>
            <p>
              Si un partido se declara oficialmente como "Sin resultado", un
              empate o no hay cuotas disponibles para un empate, todas las
              apuestas serán canceladas.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 48 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule12"
            aria-controls="rule12"
            class="help__header--sub accordion-button collapsed"
          >
            Curling
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule12"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de curling se basa en el resultado
              final del partido, incluyendo cualquier parte adicional.
            </p>
            <p>
              Excepto por eventos olímpicos o del Campeonato Mundial, si un
              partido se pospone, las apuestas se anularán.
            </p>
            <p>
              Si se abandona un partido, las apuestas coinciden con el resultado
              oficial y las apuestas de hándicap se anulan.
            </p>
            <p>
              Las apuestas anticipadas del GANADOR DEL TORNEO se liquidarán en
              la clasificación oficial inmediatamente después del último partido
              de la competición.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule13"
            aria-controls="rule13"
            class="help__header--sub accordion-button collapsed"
          >
            Ciclismo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule13"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de ciclismo se basa en el primer
              resultado final oficial de la competición o carrera.
            </p>
            <p>
              En caso de que una sola carrera sea oficialmente
              interrumpida/pospuesta, todas las apuestas relacionadas se
              considerarán nulas si la carrera no se reanuda y se completa
              dentro de las 72 horas posteriores a la hora oficial de inicio.
            </p>
            <p>
              En caso de que una etapa de carrera sea oficialmente interrumpida,
              pospuesta o cancelada oficialmente, todas las apuestas
              relacionadas estarán en curso hasta que no se complete la carrera.
            </p>
            <p>
              En caso de descalificación, las apuestas se liquidarán según el
              resultado en el momento de la presentación del podio.
            </p>
            <p>Cualquier descalificación posterior no afectará las apuestas.</p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule14"
            aria-controls="rule14"
            class="help__header--sub accordion-button collapsed"
          >
            Dardos
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule14"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de dardos se basa en el resultado final
              del partido.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si la
              carrera no se reanuda y completa dentro de las 24 horas
              posteriores a la hora oficial de inicio.
            </p>
            <p>
              En caso de que un jugador se retire antes del partido, todas las
              apuestas se considerarán nulas. En caso de que un jugador se
              retire durante el partido, el oponente será el ganador.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule15"
            aria-controls="rule15"
            class="help__header--sub accordion-button collapsed"
          >
            Fórmula 1
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule15"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de las apuestas de Fórmula 1 se basa en el primer
              resultado oficial publicado, no se considerará ninguna otra
              decisión posterior de la federación oficial competente.
            </p>
            <p>
              En caso de que una carrera sea oficialmente interrumpida /
              pospuesta, todas las apuestas relacionadas se considerarán nulas
              si la carrera no se reanuda y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
            <p>
              En todos los casos donde, por cualquier motivo o propósito, una
              carrera se cancele o abandone antes de completar al menos el 80%
              del total estimado de vueltas (teniendo en cuenta en este caso
              solo las vueltas que el primer piloto ya ha completado
              enteramente), todas las apuestas se considerarán nulas, incluso si
              la autoridad competente decide considerar la carrera como válida y
              asigna los puntos correspondientes a los equipos y pilotos.
            </p>
            <p>
              Si cualquier decisión tomada por los oficiales o por cualquier
              otra autoridad competente durante la práctica o la calificación
              oficial, incluso de acuerdo con las reglas de la federación,
              afecta fuertemente el resultado de la carrera, las apuestas que
              puedan haber sido afectadas por esa decisión serán anuladas.
            </p>
            <p>
              Todos los pilotos que participan en la vuelta de calentamiento se
              consideran como participantes efectivos y completos en la carrera
              oficial.
            </p>
            <p>
              Para los propósitos de este artículo, la participación, aunque
              solo sea temporalmente, en la vuelta de reconocimiento
              (calentamiento) siempre se considerará como una participación
              efectiva y total en la carrera oficial.
            </p>
            <p>
              En caso de que uno o más pilotos decidan retirarse de la
              competición antes del comienzo oficial de la práctica y las cuotas
              para que uno de ellos sea el ganador de la carrera sean igual o
              inferior a 5.00, es la discreción de la empresa decidir si
              declarar la anulación de todos los demás apuestas en las que el
              resultado puede haber sido, de alguna manera, fuertemente afectado
              por dicha retirada.
            </p>
            <p>
              En el caso de que un piloto no pueda realizar al menos una vuelta
              completa durante la sesión de calificación oficial, todas las
              apuestas en ese piloto se considerarán nulas.
            </p>
            <p>
              Si un piloto, después de haber realizado y completado con
              regularidad la sesión de calificación completa, por cualquier
              motivo que no participe en la competición oficial, todas las
              apuestas relacionadas se considerarán nulas, en cambio, seguirán
              siendo válidas todas las apuestas anteriores relacionadas con la
              sesión de calificación completada.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule16"
            aria-controls="rule16"
            class="help__header--sub accordion-button collapsed"
          >
            Fútbol Sala/Mini Fútbol
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule16"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de fútbol sala se basa en el resultado
              final del partido, prórrogas y penaltis.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule17"
            aria-controls="rule17"
            class="help__header--sub accordion-button collapsed"
          >
            Goleadores
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule17"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Todos los mercados ofrecidos siempre se refieren a los 90 minutos
              normales más el tiempo de lesión, no se tomarán en cuenta ningún
              eventual tiempo extra o penaltis.
            </p>
            <p>
              Los goles en propia puerta no se toman en cuenta para los fines de
              estos mercados. Si el partido es abandonado o suspendido, todas
              las apuestas serán canceladas. Si un jugador no participa en el
              partido, todas las apuestas relativas serán anuladas.
            </p>
            <p>
              Si el partido termina 0-0, todas las apuestas relacionadas con los
              jugadores que participan en el partido se considerarán perdedoras.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule18"
            aria-controls="rule18"
            class="help__header--sub accordion-button collapsed"
          >
            Golf
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule18"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de golf se basa en el primer resultado
              oficial publicado.
            </p>
            <p>
              En caso de que un torneo tenga una duración reducida o se
              interrumpa por algún motivo, las apuestas se liquidarán de acuerdo
              con los resultados oficiales publicados si se han completado al
              menos 36 hoyos. Si no se han completado 36 hoyos, todas las
              apuestas se liquidan como nulas.
            </p>
            <p>
              En caso de que un torneo sea oficialmente interrumpido o
              pospuesto, todas las apuestas relacionadas estarán en curso hasta
              que el torneo no se complete. Si el torneo es oficialmente
              cancelado, las apuestas serán canceladas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule19"
            aria-controls="rule19"
            class="help__header--sub accordion-button collapsed"
          >
            Balonmano
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule19"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de balonmano se basa en el resultado
              final del partido, excluyendo prórrogas y penaltis.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule20"
            aria-controls="rule20"
            class="help__header--sub accordion-button collapsed"
          >
            Hockey sobre hielo/Hockey sobre césped
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule20"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de hockey se basa en el resultado final
              del partido, excluyendo prórrogas y penaltis.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule21"
            aria-controls="rule21"
            class="help__header--sub accordion-button collapsed"
          >
            Motociclismo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule21"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de las apuestas de motociclismo se basa en el
              primer resultado oficial publicado, cualquier otra decisión
              posterior de la federación oficial competente no se tomará en
              cuenta.
            </p>
            <p>
              En caso de que una carrera sea oficialmente
              interrumpida/pospuesta, todas las apuestas relacionadas se
              considerarán nulas si la carrera no se reanuda y se completa
              dentro de las 72 horas posteriores a la hora oficial de inicio.
            </p>
            <p>
              En todos los casos donde, por cualquier motivo o propósito, una
              carrera se cancele o abandone antes de completar al menos el 80%
              del total estimado de vueltas (teniendo en cuenta en este caso
              solo las vueltas que el primer piloto ya ha completado
              enteramente), todas las apuestas se considerarán nulas, incluso si
              la autoridad competente decide considerar la carrera como válida y
              asigna los puntos correspondientes a los equipos y pilotos.
            </p>
            <p>
              Si cualquier decisión tomada por los oficiales o por cualquier
              otra autoridad competente durante la práctica o la calificación
              oficial, incluso de acuerdo con las reglas de la federación,
              afecta fuertemente el resultado de la carrera, las apuestas que
              puedan haber sido afectadas por esa decisión serán nulas.
            </p>
            <p>
              Todos los pilotos que participan en la vuelta de calentamiento se
              consideran como participantes efectivos y completos en la carrera
              oficial.
            </p>
            <p>
              Para los propósitos de este artículo, la participación, aunque
              solo sea temporalmente, en la vuelta de reconocimiento
              (calentamiento) siempre se considerará como una participación
              efectiva y total en la carrera oficial.
            </p>
            <p>
              En caso de que uno o más pilotos decidan retirarse de la
              competición antes del comienzo oficial de la práctica y las cuotas
              para que uno de ellos sea el ganador de la carrera sean igual o
              inferior a 5.00, es la discreción de la empresa decidir si
              declarar la anulación de todos los demás apuestas en las que el
              resultado puede haber sido, de alguna manera, fuertemente afectado
              por dicha retirada.
            </p>
            <p>
              En el caso de que un piloto no pueda realizar al menos una vuelta
              completa durante la sesión de calificación oficial, todas las
              apuestas en ese piloto se considerarán nulas.
            </p>
            <p>
              Si un piloto, después de haber realizado y completado con
              regularidad la sesión de calificación completa, por cualquier
              motivo que no participe en la competición oficial, todas las
              apuestas relacionadas se considerarán nulas, en cambio, seguirán
              siendo válidas todas las apuestas anteriores relacionadas con la
              sesión de calificación completada.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule22"
            aria-controls="rule22"
            class="help__header--sub accordion-button collapsed"
          >
            Hockey sobre hielo/Hockey sobre césped
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule22"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de póquer se basa en el primer
              resultado final oficial publicado al final de la competencia.
            </p>
            <p>
              En caso de que se cancele un evento, todas las apuestas serán
              canceladas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule23"
            aria-controls="rule23"
            class="help__header--sub accordion-button collapsed"
          >
            Remo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule23"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación para las apuestas de remo se basa en el primer
              resultado final oficial publicado al final de la competición y no
              se tomarán en cuenta descalificaciones posteriores. En caso de que
              el evento no se complete, las apuestas serán canceladas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule24"
            aria-controls="rule24"
            class="help__header--sub accordion-button collapsed"
          >
            Rugby
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule24"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de rugby se basa en el resultado final
              del partido, incluyendo prórrogas.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule25"
            aria-controls="rule25"
            class="help__header--sub accordion-button collapsed"
          >
            Snooker
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule25"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de snooker se basa en el resultado
              final del partido.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas estarán en curso hasta que el
              evento no se complete a menos que se especifique lo contrario.
            </p>
            <p>
              En caso de que un jugador se retire antes del partido, todas las
              apuestas se considerarán nulas. En caso de que un jugador se
              retire durante el partido, el oponente será el ganador.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule26"
            aria-controls="rule26"
            class="help__header--sub accordion-button collapsed"
          >
            Fútbol
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule26"
            class="help__body accordion-collapse collapse"
          >
            <p>
              A menos que se especifique lo contrario, la liquidación para las
              apuestas de fútbol se basa en 90 minutos de tiempo regular
              (incluyendo el tiempo de lesión), excluyendo cualquier prórroga,
              gol de oro o penaltis.
            </p>
            <p>
              En el caso de un partido pospuesto, todas las apuestas realizadas
              en ese partido serán anuladas. Se considera que un aplazamiento es
              cuando un partido no comienza el mismo día en que está programado
              para hacerlo. Un partido pospuesto puede ocurrir por una variedad
              de razones (aunque no exclusivamente); inclemencias del tiempo y
              condiciones, seguridad/vigilancia, fallas en el suministro
              eléctrico, problemas con la multitud.
            </p>
            <p>
              En el caso de que se abandone un partido, se aplicarán los
              siguientes principios en la liquidación de apuestas:
            </p>
            <ul>
              <li>
                Si se ha establecido una selección ganadora en un mercado
                específico antes del abandono del partido, las apuestas se
                mantendrán y la liquidación se realizará como se esperaba.
              </li>
              <li>
                Si no se ha establecido una selección ganadora para un mercado
                específico en el momento del abandono, todas las apuestas se
                liquidarán como nulas.
              </li>
              <li>
                Se considera que un abandono es cuando un partido se detiene
                antes de la finalización del tiempo asignado y no se concluye el
                mismo día.
              </li>
              <li>
                Un partido que se interrumpe (por ejemplo, inclemencias de
                tiempo), pero luego llega a una conclusión el mismo día no se
                toma en cuenta como un abandono y las apuestas se liquidarán
                según el resultado al final del partido.
              </li>
              <li>
                En el caso de un abandono, cualquier repetición/finalización
                posterior, el fallo del resultado del partido por parte de los
                órganos gobernantes o las decisiones del panel de agrupaciones
                no se tomarán en cuenta para la liquidación.
              </li>
            </ul>
            <p>
              Solo los partidos interrumpidos oficialmente serán considerados
              nulos; si el árbitro señala el final regular antes de que el
              tablero de anotaciones muestre que han transcurrido 90 minutos, se
              considerará un resultado válido.
            </p>
            <p>
              En caso de victoria por pérdida, todas las apuestas relacionadas
              se considerarán nulas.
            </p>
            <p>
              Todas las apuestas nulas se liquidarán al día siguiente a las
              24.00 (00.00) horas a partir de la hora de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule27"
            aria-controls="rule27"
            class="help__header--sub accordion-button collapsed"
          >
            Nadar
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule27"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de las apuestas de nadar se basa en el primer
              resultado oficial.
            </p>
            <p>
              En caso de que una competición sea oficialmente
              interrumpida/pospuesta, todas las apuestas relacionadas se
              considerarán nulas si la competición no se reanuda/juega y se
              completa dentro de las 24 horas.
            </p>
            <p>
              En caso de que un participante/equipo se retire o sea
              descalificado, cualquier apuesta se considerará como perdedora, a
              menos que se especifique lo contrario. Las apuestas realizadas a
              otros participantes seguirán siendo válidas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule28"
            aria-controls="rule28"
            class="help__header--sub accordion-button collapsed"
          >
            Tenis
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule28"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de tenis se basa en el resultado final
              del partido.
            </p>
            <p>
              En el caso de un partido en el que es posible un empate y los
              tiempos adicionales se juegan para determinar el equipo que pasa a
              la siguiente ronda, el resultado se basará en el resultado final
              (excluyendo prórrogas).
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
            <p>
              En caso de que un partido se juegue en una cancha de tenis que sea
              diferente al programado inicialmente por los oficiales del torneo,
              las apuestas serán canceladas.
            </p>
            <p>
              Si un partido no se lleva a cabo debido al retiro o la
              descalificación de uno de los jugadores antes del inicio, el
              evento se considerará nulo.
            </p>
            <p>
              Si cualquiera de los dos jugadores se retira o es descalificado
              antes del final del first set, las apuestas se considerarán nulas.
              Si uno de los jugadores se retira o es descalificado después de
              que se concluya oficialmente el first set, el oponente será
              considerado el ganador y las apuestas relacionadas con los sets
              completados se liquidarán según el resultado adquirido en la
              cancha.
            </p>
            <p>
              En un doble, si al menos uno de los cuatro jugadores se retira
              antes del partido, y su compañero decide participar en el partido
              con otro jugador, todas las apuestas realizadas en el evento se
              considerarán nulas.
            </p>
            <p>
              En caso de que un partido programado para ser jugado en "Lo mejor
              de 5 sets" se juegue luego en "Lo mejor de 3 sets", todas las
              apuestas serán canceladas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule29"
            aria-controls="rule29"
            class="help__header--sub accordion-button collapsed"
          >
            Waterpolo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule29"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación de apuestas de waterpolo se basa en el resultado
              final del partido, excluyendo prórrogas y penaltis.
            </p>
            <p>
              En caso de que un partido sea oficialmente interrumpido/pospuesto,
              todas las apuestas relacionadas se considerarán nulas si el
              partido no se reanuda/juega y se completa dentro de las 72 horas
              posteriores a la hora oficial de inicio.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule30"
            aria-controls="rule30"
            class="help__header--sub accordion-button collapsed"
          >
            Deportes de Invierno
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule30"
            class="help__body accordion-collapse collapse"
          >
            <p>
              La liquidación para deportes de invierno se basa en el primer
              resultado oficial publicado.
            </p>
            <p>
              En caso de que un evento tenga una duración reducida o se
              interrumpa por algún motivo, las apuestas se liquidarán de acuerdo
              con los resultados oficiales publicados.
            </p>
            <p>
              En caso de que una competición sea oficialmente
              interrumpida/pospuesta, todas las apuestas relacionadas se
              considerarán nulas si la competición no se reanuda/juega y se
              completa dentro de las 72 horas posteriores a la hora oficial de
              inicio.
            </p>
            <p>
              En caso de que uno o más participantes se retiren de la
              competición antes del inicio oficial y las cuotas de que uno de
              ellos sea el ganador sean igual o inferior a 5.00, es la
              discreción de la empresa decidir si anulará todas las demás
              apuestas cuyo resultado pueda ser, de alguna manera, fuertemente
              afectado por tal retiro.
            </p>
            <p>
              Si las condiciones de la competición serán muy diferentes de las
              publicadas originalmente por los organizadores, las apuestas se
              anularán.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#rule31"
            aria-controls="rule31"
            class="help__header--sub accordion-button collapsed"
          >
            Otros
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-2"
            id="rule31"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Para cada caso no cubierto por nuestras reglas, la empresa se
              reserva el derecho de decidir de forma autónoma.
            </p>
          </div>
        </div>
      {/if}
      {#if selected === "defbet"}
        <div class="help__header--title">Apuesta Definiciones</div>
        <div id="accordion-help-sub2-1" class="help__body--sub">
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet1"
            aria-controls="bet1"
            class="help__header--sub accordion-button collapsed"
          >
            Atletismo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet1"
            class="help__body accordion-collapse collapse"
          >
            <p>
              H/H: Tienes que adivinar cuál de los dos atletas/equipos que
              figuran será mejor colocado en la competencia.En caso de la misla
              colocación final entre los atletas o equipos listados, todas las
              apuestas se considerarán nulas. Tipos de apuestas disponibles en
              este mercado:
            </p>
            <ul>
              <li>
                1 HH: El primer atleta / equipo listado estará mejor ubicado que
                el segundo atleta / equipo de la lista
              </li>
              <li>
                2 HH: El segundo atleta / equipo listado estará mejor ubicado
                que el primer atleta / equipo listado
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet2"
            aria-controls="bet2"
            class="help__header--sub accordion-button collapsed"
          >
            Fútbol americano
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet2"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Handicap: El resultado de la apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final del partido. El
              valor de handicap se refiere siempre al equipo local. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 H: El equipo local anotará más puntos que el equipo visitante
                (considerando el handicap).
              </li>
              <li>
                2 H: El equipo visitante marcará más puntos que el equipo local
                (considerando el handicap).
              </li>
            </ul>
            <p>
              1X2: Tienes que adivinar el ganador del partido. En caso de
              tiempos extra, los puntos obtenidos después del cuarto tiempo no
              serán considerados. El resultado es válido incluso si el partido
              se interrumpe durante la etapa posterior. En este caso, no se
              consideraría ningún partido Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>El equipo local ganará el partido.</li>
              <li>Empate</li>
              <li>El equipo visitante ganará el partido.</li>
            </ul>
            <p>
              H/H: Tienes que adivinar el equipo que va a ganar el partido.
              Tipos de apuestas disponibles en este mercado
            </p>
            <ul>
              <li>HH: El equipo local ganará el partido.</li>
              <li>HH: El equipo visitante ganará el partido.</li>
            </ul>
            <p>
              Más/Menos:Tienes que pronosticar si habrá más o menos puntos
              anotados durante el tiempo reglamentario. Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>
                Más: El número total de puntos marcados durante el partido será
                superior al número indicado.
              </li>
              <li>
                Menos: El número total de puntos marcados durante el partido
                estará debajo del número indicado.
              </li>
            </ul>
            <p>
              Odd/Even:Tienes que pronosticar si el número total de puntos
              anotados en el encuentro será par o impar. Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>
                Odd: El número total de puntos anotados en el partido será
                impar.
              </li>
              <li>
                Even: El número total de puntos anotados en el partido será par.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet3"
            aria-controls="bet3"
            class="help__header--sub accordion-button collapsed"
          >
            Béisbol
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet3"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Handicap: El resultado de la apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final del partido. El
              valor de handicap se refiere siempre al equipo local. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 H: El equipo local anotará más carreras que el equipo
                visitante (considerando el handicap)
              </li>
              <li>
                2 H:El equipo visitante anotará más carreras que el equipo local
                (considerandoel handicap)
              </li>
            </ul>
            <p>
              H/H:Tienes que adivinar el equipo que va a ganar el partido. Tipos
              de apuestas disponibles en este mercado
            </p>
            <ul>
              <li>1 HH: El equipo local ganará el partido.</li>
              <li>2 HH: El equipo visitante ganará el partido.</li>
            </ul>
            <p>
              Más/Menos: Tienes que pronosticar si habrá más o menos puntos
              anotados durante el tiempo reglamentario. Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>
                Más/Menos: Tienes que pronosticar si habrá más o menos puntos
                anotados durante el tiempo
              </li>
              <li>
                Menos: El número total de puntos marcados durante el partido
                estará debajo del número indicado.
              </li>
            </ul>
            <p>
              Odd/Even: Tienes que pronosticar si el número total de puntos
              anotados en el encuentro será par o impar. Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>
                Odd: El número total de puntos anotados en el partido será
                impar.
              </li>
              <li>
                Even: El número total de puntos anotados en el partido será par.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet4"
            aria-controls="bet4"
            class="help__header--sub accordion-button collapsed"
          >
            Baloncesto
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet4"
            class="help__body accordion-collapse collapse"
          >
            <p>
              1-2:Tienes que pronosticar el ganador del partido.Dos resultados
              posibles:
            </p>
            <ul>
              <li>1 (victoria del equipo de casa) y</li>
              <li>
                2 (victoria del equipo huésped).El resultado final también
                tendrá en cuenta el tiempo extra
              </li>
            </ul>
            <p>
              Over/Under: Hay que pronosticar el número total de puntos del
              partido
            </p>
            <p>
              Hand 1-2:Tienes que predecir el ganador del partido sumando o
              restando el spread indicado por la Compañía. Hay dos resultados
              posibles:
            </p>
            <ul>
              <li>
                1H (el resultado será ganar si el primer equipo gana con un
                margen más alto que el spread);
              </li>
              <li>
                2H (el resultado se gana si el segundo equipo gana con un margen
                superior al spread). El resultado final tendrá en cuenta
                cualquier tiempo adicional.
              </li>
            </ul>
            <p>
              Odd/Even: Tines que predecir el número de puntos totales. Hay dos
              posibles resultados.
            </p>
            <ul>
              <li>
                Odd (el resultado es exitoso si el número total de puntos es
                impar);
              </li>
              <li>
                Even (el resultado es exitoso si el número total de puntos es
                par). El resultado final tendrá en cuenta cualquier tiempo
                adicional.
              </li>
            </ul>
            <p>
              Marg 1x2: Tienes que predecir si el equipo seleccionado ganará el
              partido con un margen de victoria de al menos 6 puntos.
            </p>
            <ul>
              <li>
                1 (&gt; 5): El resultado es ganador si el primer equipo gana con
                un margen de al menos 6 puntos;
              </li>
              <li>
                X (0-5): El resultado es el ganador si la diferencia entre los
                puntos anotados por el ganador y el perdedor no es mayor que 5;
              </li>
              <li>
                2 (&gt; 5): El resultado es el ganador si el segundo equipo gana
                con un margen de al menos 6 puntos. El resultado final
                considerará cualquier tiempo adicional
              </li>
            </ul>
            <p>
              1ER cuarto(1X2): Tienes que pronosticar el resultado del primer
              cuarto
            </p>
            <ul>
              <li>
                1 si al final del primer cuarto, el primer equipo está ganando
              </li>
              <li>
                X si al final del primer cuarto los dos equipos están empatados
              </li>
              <li>
                2 si al final del primer cuarto, el segundo equipo está ganando
              </li>
            </ul>
            <p>
              Handicap 1st Quarter: El resultado de la apuesta se obtiene
              sumando o restando el hándicap al resultado del primer cuarto del
              equipo de casa.?
            </p>
            <p>
              Over/Under 1st Quarter: Hay que pronosticar si el número total de
              los puntos anotados durante el primer cuarto será mayor o menor
              que el número indicado
            </p>
            <p>
              1st Half: You have to predict which team will score more points
              after the first two quarters:
            </p>
            <p>
              Odd/Even 1st Quarter: Hay que pronosticar si el número total de
              puntos anotados en el primer cuarto del encuentro será par o
              impar.?Hay dos posibles resultados.
            </p>
            <ul>
              <li>
                Odd (el resultado es el ganador si el número de puntos es
                impar);
              </li>
              <li>
                Even (el resultado es el ganador si el número de puntos es par).
              </li>
            </ul>
            <p>
              Handicap 1st Half: " El resultado de la apuesta se obtiene sumando
              o restando el hándicap al resultado del primer tiempo del equipo
              de casa."
            </p>
            <p>
              Over/Under 1st Half: Tienes que pronosticar si el número total de
              los puntos anotados durante el primer tiempo será mayor o menor
              que el número indicado
            </p>
            <ul>
              <li>
                1x2:Tienes que pronosticar el resultado final del partido 1, X o
                2.
              </li>
              <li>
                1X2: 1st Half: Tienes que pronosticar el resultado del primer
                tiempo 1,X o 2
              </li>
              <li>
                DC: Tienes que predecir el resultado del partido en doble
                oportunidad 1X, 12, X2.
              </li>
              <li>
                DC 1ª mitad: Tienes que predecir el resultado de la primera
                mitad en doble oportunidad 1X, 12, X2.
              </li>
              <li>
                DNB 1ª mitad:Tienes que predecir qué equipo terminará ganando la
                1ª mitad. En caso de empate, la apuesta será devuelta.
              </li>
            </ul>
            <p>
              2nd Quarter Odd/Even: Tienes que predecir si el número total de
              puntos anotados durante el segundo cuarto será impar o par.
            </p>
            <ul>
              <li>
                Odd/Even Home: Tienes que pronosticar si el número total de los
                puntos anotados en el encuentro por el equipo de casa será par o
                impar.
              </li>
              <li>
                Odd/Even Away: Tienes que pronosticar si el número total de los
                puntos anotados en el encuentro por el equipo huésped será par o
                impar.
              </li>
              <li>
                Home O/U:Tienesque pronosticar si el número de los puntos
                anotados por el equipo de casa será mayor o menor que el número
                indicado
              </li>
              <li>
                Away O/U: Tienes que pronosticar si el número de los puntos
                anotados por el equipo huésped será mayor o menor que el número
                indicado
              </li>
              <li>
                Combo: Tienes que predecir el resultado del partido, 1 o 2,
                simultáneamente al sobre / bajo propuesto.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet5"
            aria-controls="bet5"
            class="help__header--sub accordion-button collapsed"
          >
            Baloncesto Special
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet5"
            class="help__body accordion-collapse collapse"
          >
            <p>
              HH Scorer: Tienes que pronosticar cuál de los dos jugadores
              marcará más puntos durante el partido dado. Los puntos anotados en
              otras competiciones no se tienen en cuenta en este tipo de
              apuesta. Si los dos jugadores anotan el mismo número de puntos,
              esta apuesta será nula. En caso de que uno de los dos jugadores de
              baloncesto juega por un período de menos de 1 minuto, la apuesta
              es nula, también son válidos para los fines de apuesta cualquier
              tiempo extra.
            </p>
            <p>
              Player Over/Under Points: Tienes que predecir si el número de
              puntos anotados por el jugador seleccionado al final del partido,
              será más o menos que el spread ofrecido. Por ejemplo, dado
              cualquier partido de baloncesto, el jugador 1 se ofrece con un
              impar de 1,85 con HND 27,5 (es decir, el spread para apostar). En
              este punto, si el jugador 1, durante el partido anotará un número
              de puntos totales más bajo que el spread ofrecido (por ejemplo,
              25), la selección Under será ganadora. En su lugar, si el jugador
              1 anotará un punto total más alto que el spread (por ejemplo, 28),
              la selección Over será ganadora. Cabe señalar que, en caso de que
              el jugador no participe ni siquiera parcialmente en el partido,
              todas las apuestas relacionadas serán declaradas nulas. Además,
              para los propósitos de esta apuesta se considerarán válidos todos
              los puntos, incluyendo los marcados en tiros libres o durante
              cualquier tiempo extra.
            </p>
            <p>
              Player Over/Under Assists: Tienes que predecir si el número de
              asistencias hechas por el jugador ofrecido será mayor (más) o
              menor (bajo) en comparación con el número de vez en cuando
              indicado. Si el jugador no participa, ni siquiera parcialmente, en
              el partido, todas las apuestas relacionadas con él serán
              declaradas nulas. Para el pago de esta apuesta se considerará
              válida, todas las asistencias, incluyendo aquellas obtenidas
              durante cualquier tiempo extra.
            </p>
            <p>
              Player Over/Under Rebounds: Tienes que predecir si el número de
              rebotes realizados por el jugador ofrecido será mayor (más) o
              menor (bajo) en comparación con el número de vez en cuando
              indicado. Si el jugador no participa, ni siquiera parcialmente, en
              el partido, todas las apuestas relacionadas con él serán
              declaradas nulas. Para el pago de esta apuesta se considerará
              válida, todos los rebotes, incluyendo los obtenidos durante
              cualquier tiempo extra.
            </p>
            <p>
              NBA Play Off HH (Round Winner): Tienes que predecir qué equipo de
              vez en cuando se enumeran en el mini torneo ganará más partidos y,
              por lo tanto, pasar a la siguiente ronda. Cabe señalar que, en
              particular, entrará en la siguiente ronda el equipo que ganará 4
              de las 7 reuniones programadas.
            </p>
            <p>
              Italia A1 Play Off HH (Round Winner):Tienes que predecir qué
              equipo de vez en cuando se enumeran en el mini torneo ganará más
              partidos y, por lo tanto, pasar a la siguiente ronda. Cabe señalar
              que, en particular, entrará en la siguiente ronda el equipo que
              ganará 4 de las 7 reuniones programada
            </p>
            <p>
              Italia Lega 2 Play Off HH (Round Winner): Tienes que predecir qué
              equipo de vez en cuando se enumeran en el mini torneo ganará más
              partidos y, por lo tanto, pasar a la siguiente ronda. Cabe señalar
              que, en particular, entrará en la siguiente ronda el equipo que
              ganará 3 de las 5 reuniones programadas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet6"
            aria-controls="bet6"
            class="help__header--sub accordion-button collapsed"
          >
            Voleibol de Playa
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet6"
            class="help__body accordion-collapse collapse"
          >
            <p>
              H/H: Tienes que pronosticar el equipo que va a ganar el partido.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1 HH: El primer equipo de la lista ganará el partido</li>
              <li>2 HH: El segundo equipo de la lista ganará el partido</li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet7"
            aria-controls="bet7"
            class="help__header--sub accordion-button collapsed"
          >
            Boxeo y Pelea
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet7"
            class="help__body accordion-collapse collapse"
          >
            <p>
              1X2:Tienes que pronosticar el equipo que va a ganar el partido. El
              método de victoria (KO, TKO o puntos de victoria) no hace ninguna
              diferencia. Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1: El primer boxeador de la lista ganará el partido</li>
              <li>X: Empate</li>
              <li>2: El segundo boxeador de la lista ganará el partido</li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet8"
            aria-controls="bet8"
            class="help__header--sub accordion-button collapsed"
          >
            Ajedrez
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet8"
            class="help__body accordion-collapse collapse"
          >
            <p>
              1X2:Tienes que pronosticar el equipo que va a ganar el partido. El
              método de victoria (KO, TKO o puntos de victoria) no hace ninguna
              diferencia. Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1: El primer boxeador de la lista ganará el partido</li>
              <li>X: Empate</li>
              <li>2: El segundo boxeador de la lista ganará el partido</li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet9"
            aria-controls="bet9"
            class="help__header--sub accordion-button collapsed"
          >
            Críquet
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet9"
            class="help__body accordion-collapse collapse"
          >
            <p>
              1x2: Hay que pronosticar el resultado final del partido Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1: equipo de casa gana</li>
              <li>X:empate</li>
              <li>2:equipo visitante gana</li>
            </ul>
            <p>
              H/H: Hay que pronosticar el equipo que va a ganar el partido.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1 HH: El equipo de casa ganará el partido</li>
              <li>2 HH: El equipo huésped ganará el partido</li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet10"
            aria-controls="bet10"
            class="help__header--sub accordion-button collapsed"
          >
            Curling
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet10"
            class="help__body accordion-collapse collapse"
          >
            <p>
              H/H:Tienes que pronosticar el equipo que va a ganar el partido.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1 HH:El equipo de casa ganará el partido</li>
              <li>2 HH: El equipo visitante ganará el partido</li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet11"
            aria-controls="bet11"
            class="help__header--sub accordion-button collapsed"
          >
            Ciclismo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet11"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Winning Antepost :Las apuestas sobre el ganador de un evento dado
              seguirán siendo válidas aunque el ciclista seleccionado no
              participe en la competición, o si no termina el evento por
              cualquier motivo.
            </p>
            <p>
              Primera y segunda posición: Tienes que predecir los dos ciclistas
              que completarán el evento en primera y segunda posición, en el
              orden exacto de llegada.
            </p>
            <p>
              Podio :Tienes que predecir que el ciclista seleccionado llegará al
              podio (primera, segunda o tercera posición).
            </p>
            <p>
              Ganador de la etapa :Es el ciclista quien termina primero en la
              orden oficial de llegada comunicada al final de la etapa.
            </p>
            <p>
              Ganador del Grupo: Tienes que predecir que el ciclista
              seleccionado obtendrá la mejor colocación en el grupo propuesto.
              Si uno o más ciclistas del grupo se retiran antes del evento,
              todas las apuestas serán declaradas nulas.
            </p>
            <p>
              Head To Head Stage:El ganador será el ciclista en la mejor
              posición en la orden oficial de llegada. Si ambos ciclistas no
              terminan la etapa, la apuesta será nula. El otro head to head en
              la apuesta seguirá siendo válido. Si por alguna razón un ciclista
              no toma parte en el escenario, el relativohead to head será nulo.
            </p>
            <p>
              Ganador de la etapa (Más / Menos): A los fines de estas apuestas,
              el evento especificado en el calendario debe ser completado en
              todas las etapas previstas. Si esto no sucede, todas las apuestas
              relacionadas con él serán declaradas vacías (excepto aquellas
              donde el resultado ya es definitivo). Además, para que las
              apuestas especiales de un corredor en particular sean válidas,
              debe participar en el evento relevante o su etapa. En cuanto a las
              apuestas especiales sobre el «número de ciclistas», sólo se
              considerarán válidas si el número previsto de equipos participará
              en el evento propuesto.
            </p>
            <p>
              First Six Placement (Winner): Para ganar esta apuesta debes
              predecir que el ciclista seleccionado será capaz de estar entre
              los seis primeros.
            </p>
            <p>
              First Ten Placement (Winner): Para ganar esta apuesta debes
              predecir que el ciclista seleccionado será capaz entre los diez
              primeros.
            </p>
            <p>
              Winner Team: Usted tiene que predecir el equipo del ganador de la
              competencia (o etapa). Para los fines de esta apuesta, los retiros
              antes del evento seleccionado no serán tenidos en cuenta.
            </p>
            <p>
              Number Of Stages Won: Tienes que predecir cuántos triunfos
              conseguirá el ciclista seleccionado. En caso de empate en una o
              más etapas se considerará como una victoria. Además, si un
              ciclista se retirara antes del inicio de la primera etapa, todas
              las apuestas relacionadas se considerarán nulas. Si se retira
              durante la competición, las apuestas serán válidas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet12"
            aria-controls="bet12"
            class="help__header--sub accordion-button collapsed"
          >
            Dardos
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet12"
            class="help__body accordion-collapse collapse"
          >
            <p>
              H/H: Tienesque pronosticar el equipo que va a ganar el partido.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1 HH: El primer competidor listado ganará el partido</li>
              <li>2 HH: El segundo competidor de la lista ganará el partido</li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet13"
            aria-controls="bet13"
            class="help__header--sub accordion-button collapsed"
          >
            Hockey Sobre Hierba
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet13"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Handicap: El resultado de la apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final del partido. El
              valor de handicap se refiere siempre al equipo local. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 H: El equipo local anotará más goles que el equipo visitante
                (considerando el handicap).
              </li>
              <li>
                2 H: El equipo visitante marcará más goles que el equipo local
                (considerando el handicap).
              </li>
            </ul>
            <p>
              1X2:Tienes que pronosticar al ganador del partido.Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1: equipo de casa gana</li>
              <li>X:empate</li>
              <li>2:equipo visitante gana</li>
            </ul>
            <p>
              DC: Tienes que pronosticar al ganador del partido eligiendo una de
              las selecciones disponibles: Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>1XDC: El equipo local ganará el partido o habrá un empate</li>
              <li>
                12DC: El equipo local o el equipo visitante ganará el partido
              </li>
              <li>
                X2DC: El equipo visitante ganará el partido o habrá un empate
              </li>
              <li>1X2 sin apuesta</li>
            </ul>
            <p>
              HNB: Tienes que predecir el resultado del partido. En caso de que
              el equipo local gane el partido, se devolverá la apuesta. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                X HNB: Habrá un sorteo. En caso de que el equipo local gane el
                partido, se devolverá la apuesta.
              </li>
              <li>
                2 HNB: El equipo visitante ganará el partido. En caso de que el
                equipo local gane el partido, se devolverá la apuesta.
              </li>
            </ul>
            <p>
              DNB: Tienes que predecir qué equipo ganará el partido. En caso de
              empate, se devolverá la apuesta. Tipos de apuestas disponibles en
              este mercado:
            </p>
            <ul>
              <li>
                1 DNB: El equipo local ganará el partido. En caso de empate, se
                devolverá la apuesta.
              </li>
              <li>
                2 DNB: El equipo visitante ganará el partido. En caso de empate,
                se devolverá la apuesta.
              </li>
            </ul>
            <p>
              ANB: Tienes que predecir el resultado del partido. En caso de que
              el equipo visitante gane el partido, se le devolverá la apuesta.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 ANB: El equipo local ganará el partido. En caso de que el
                equipo visitante gane el partido, se le devolverá la apuesta.
              </li>
              <li>
                X ANB: Habrá un empate. En caso de que el equipo visitante gane
                el partido, se le devolverá la apuesta.
              </li>
            </ul>
            <p>
              Más/Menos: Tienes que predecir si el número total de goles
              marcados durante el partido será mayor o menor al número indicado.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                Over: El número total de goles marcados durante el partido será
                superior al número indicado
              </li>
              <li>
                Under: El número total de goles marcados durante el partido
                estará bajo el número indicado
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet14"
            aria-controls="bet14"
            class="help__header--sub accordion-button collapsed"
          >
            Fórmula 1
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet14"
            class="help__body accordion-collapse collapse"
          >
            <p>
              "Winner (Race)": Tienes que pronosticar el ganador de Grand Prix.
            </p>
            <p>
              "Winning Team (Race)": Tienes que pronosticar qué equipo tendrá el
              piloto ganador.
            </p>
            <p>
              "Pair": Ambos pilotos deben clasificarse en las dos primeras
              posiciones de la carrera. En caso de diferentes colocaciones o
              retiros, la apuesta se considerará nula. Para los propósitos de la
              apuesta, sólo se considerará la orden oficial de llegada
              confirmada durante la ceremonia de premiación. Las
              descalificaciones posteriores no afectarán el resultado de las
              apuestas. En caso de que uno de los pilotos de la apuesta no esté
              en la parrilla de salida para la vuelta de reconocimiento, la
              apuesta será considerada nula;
            </p>
            <p>
              "1st Or 2nd (Race)": Tienes que predecir que el conductor
              seleccionado conseguirá la primera o segunda posición al final de
              la carrera;
            </p>
            <p>
              "Podium (Race)": Tienes que pronosticar si el piloto terminará en
              el podio (top 3).
            </p>
            <p>
              "HH (Race)": Tienes que predecir qué conductor, en las parejas de
              vez en cuando se propone obtener la mejor colocación en la
              carrera. Tiene que ser notificado que, en caso de que ambos
              pilotos sean descalificados o se retiren de la carrera durante la
              misma vuelta, todas las apuestas serán consideradas nulas. Incluso
              en caso de que uno de los dos pilotos (o incluso ambos), por
              cualquier motivo no participe en la carrera oficial, todas las
              apuestas asociadas con ellos serán consideradas nulas;
            </p>
            <p>
              Tienes que predecir qué conductor, en los tres de vez en cuando se
              propone obtener la mejor colocación en la carrera. Tiene que ser
              notificado que, en caso de que todos los pilotos sean
              descalificados o se retiren de la carrera durante la misma vuelta,
              todas las apuestas serán consideradas nulas. Incluso en caso de
              que uno o todos los conductores, por la razón que sea, no
              participan en la carrera oficial, todas las apuestas asociadas con
              ellos serán consideradas nulas;
            </p>
            <p>
              "Best Of Four (Race)": Tienes que predecir qué conductor, en los
              cuatro de vez en cuando se propone obtener la mejor colocación en
              la carrera. Tiene que ser notificado que, en caso de que todos los
              pilotos sean descalificados o se retiren de la carrera durante la
              misma vuelta, todas las apuestas serán consideradas nulas. Incluso
              en caso de que uno o todos los conductores, por la razón que sea,
              no participan en la carrera oficial, todas las apuestas asociadas
              con ellos serán consideradas nulas;
            </p>
            <p>
              "Winner (Pole)": Tienes que pronosticar qué piloto conseguirá el
              mejor resultado en la calificación.
            </p>
            <p>
              "1st And 2nd(Pole)" Tienes que seleccionar dos corredores de la
              lista y predecir quién estará, respectivamente y en el orden
              correcto, en la primera y segunda posición al final de la
              calificación oficial;
            </p>
            <p>
              "Podium (Pole)":Tienes que pronosticar si el piloto conseguirá uno
              de tres resultados mejores en la calificación.
            </p>
            <p>
              "HH (Pole)": Tienes que predecir qué conductor, en las parejas de
              vez en cuando se propone obtener la mejor colocación durante la
              calificación oficial. Tiene que ser notificado que, en caso de que
              uno o ambos pilotos no puedan completar una vuelta completa
              durante la calificación oficial, todas las apuestas relacionadas
              se considerarán nulas;
            </p>
            <p>
              "Class/No Class (Race)": Tienes que predecir que el conductor
              seleccionado será clasificado en el informe oficial de la
              Fédération Internationale de l'Automobile publicado inmediatamente
              después de la carrera. En ningún caso se considerará clasificado,
              incluso en contraste con lo decidido por la FIA, todos los pilotos
              que no hayan completado al menos el 90% de las vueltas totales
              completadas por el ganador de la carrera;
            </p>
            <p>
              "Cars Classified (Race)": Tienes que predecir el número total de
              pilotos que se clasificarán en el informe oficial de la Fédération
              Internationale de l'Automobile publicado inmediatamente después de
              la carrera. Todas las vueltas comenzadas pero no terminadas serán
              redondeadas abajo para los propósitos de esta apuesta;
            </p>
            <p>
              "Point Finish 1 – 10 (Race)": Tienes que predecir que el piloto
              seleccionado de la lista podrá ganar al menos un punto al final de
              la carrera oficial (cruza la línea de meta en el top 10);
            </p>
            <p>
              "NO Point (Race)": Tienes que predecir que el conductor
              seleccionado de la lista no podrá ganar ni siquiera un punto al
              final de la carrera oficial (termina a partir de la undécima
              posición en adelante);
            </p>
            <p>
              "Fastest Lap (Race)": Tienes que predecir quién será el conductor
              en hacer la vuelta más rápida durante la carrera oficial;
            </p>
            <p>
              "1st Retired (Race)": Tienes que predecir quién será el conductor,
              entre todos los propuestos, que se retirará primero de la carrera
              oficial. A los efectos de esta apuesta, todos los retiros en la
              misma vuelta, se considerarán simultáneos (sin considerar el orden
              específico de los retiros). A los fines de esta apuesta se
              tratarán como retiros también posibles suspensiones o abandono de
              la carrera debido a accidentes o malfuncionamientos del vehículo;
            </p>
            <p>
              "Cars Not To Complete First Lap (Race)": Hay que predecir el
              número total de pilotos que no podrán completar la primera vuelta
              de la carrera oficial;
            </p>
            <p>
              "Safety Car (Race)": Tienes que predecir si o no el coche de
              seguridad entra en la pista durante la carrera oficial. Las
              sesiones de Virtual Safety Car no se consideran para las apuestas;
            </p>
            <p>
              "Best Of Group": Tienes que predecir que el conductor seleccionado
              ganará la mejor posición entre todos los conductores en el grupo.
              En caso de que uno o más pilotos no participen en la carrera,
              todas las apuestas serán consideradas nulas.
            </p>
            <p>
              "Margin Of Victory": Tienes que predecir que el ganador del evento
              obtendrá, un margen de victoria mayor que, menor o entre los
              tiempos propuestos. Todas las apuestas relacionadas con este tipo
              de impar serán pagadas de acuerdo a los resultados oficiales.
            </p>
            <p>
              "Constructors Championship Winner (Antepost)"Tienes que predecir
              qué equipo entre todos los propuestos, ganará el Campeonato de
              Constructores al final de la temporada. En caso de que uno o más
              pilotos pertenecientes a un equipo no participen, por cualquier
              motivo, en la primera sesión clasificatoria de la temporada, y el
              impar relativo como ganador del Campeonato Constructor es igual o
              inferior a 5,00, será la discreción De la empresa para decidir si
              declarar Nulo todas las otras apuestas cuyo resultado puede estar,
              de alguna manera, fuertemente influenciado por este evento. Si
              todos los pilotos de los distintos equipos participan en la
              primera sesión clasificatoria de la temporada, todas las apuestas
              se considerarán válidas para todos los efectos;
            </p>
            <p>
              "Driver’s Championship Winner (Antepost)" Usted tiene que predecir
              qué conductor entre todos los propuestos, ganará el Campeonato de
              Conductor al final de la temporada. En caso de que el piloto
              seleccionado no participe, por cualquier motivo, en la primera
              sesión clasificatoria de la temporada y el impar relativo como
              ganador del Campeonato de Pilotos es igual o inferior a 5.00, será
              la discreción de la empresa decidir si Para declarar Vacío también
              todas las demás apuestas cuyo resultado puede estar, de alguna
              manera, fuertemente influenciado por este evento. Si el piloto
              seleccionado participa en la primera sesión clasificatoria de la
              temporada, las apuestas relacionadas serán válidas para todos los
              efectos;
            </p>
            <p>
              "Driver’s Championship – Head To Head Final (Antepost)": Tienes
              que predecir qué conductor entre las parejas de vez en cuando se
              propone obtener la mejor colocación al final de la temporada
              actual. En caso de que, al final de la temporada, dos o más
              pilotos tengan el mismo número de puntos en la clasificación
              general, para los fines de esta apuesta el ganador será decidido
              con las mismas reglas que la federación internacional
              (considerando el promedio de Todas las colocaciones obtenidas
              durante la temporada).
            </p>
            <p>
              "Both Cars Points Finish": Usted tiene que predecir que ambos
              coches de un equipo terminan en posiciones que proporcionan la
              asignación de puntos, si un equipo participa en una carrera con un
              coche todas las apuestas serán nulas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet15"
            aria-controls="bet15"
            class="help__header--sub accordion-button collapsed"
          >
            Fútbol Sala
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet15"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Handicap: El resultado de la apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final del partido.El
              valor de handicap se refiere siempre al equipo local. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 H: El equipo local anotará más goles que el equipo visitante
                (considerando el handicap).
              </li>
              <li>
                2 H: El equipo visitante marcará más goles que el equipo local
                (considerando el handicap).
              </li>
            </ul>
            <p>
              1X2: Tienes que pronosticar al ganador del partido. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1:El equipo de casa ganará el partido.</li>
              <li>X: El resultado será empate</li>
              <li>2:El equipo huésped ganará el partido</li>
            </ul>
            <p>
              DC: Hay que pronosticar el ganador del partido eligiendo una de
              las opciones disponibles Tipos de apuestas disponibles en este
              mercado
            </p>
            <ul>
              <li>
                1XDC:El equipo de casa ganará el partido o el resultado será
                empate
              </li>
              <li>
                12DC: El equipo de casa o el equipo de fueraganará el partido
              </li>
              <li>
                X2DC:El equipo de fuera ganará el partido o el resultado será
                empate
              </li>
              <li>1X2 No Bet</li>
            </ul>
            <p>
              HNB: Hay que pronosticar el resultado del partido Si el equipo de
              casa gana el partido, el importe apostado será reembolsado.
            </p>
            <ul>
              <li>
                X HNB: El resultado será empate. Si el equipo de casa gana el
                partido, el importe apostado será reembolsado.
              </li>
              <li>
                2 HNB: El equipo huésped ganará el partido. Si el equipo de casa
                gana el partido, el importe apostado será reembolsado.
              </li>
            </ul>
            <p>
              DNB: Tienes que pronosticar el equipo que ganará en el partido. En
              el caso de empate, el importe apostado será reembolsado.
            </p>
            <ul>
              <li>
                1 DNB:El equipo de casa ganará el partido. En el caso de empate,
                el importe apostado será reembolsado
              </li>
              <li>
                2 DNB:El equipo de fuera ganará el partido. En el caso de
                empate, el importe apostado será reembolsado.
              </li>
            </ul>
            <p>
              ANB:Hay que pronosticar cuál equipo ganará el partido Si el equipo
              de fuera gana el partido, el importe apostado será reembolsado.
            </p>
            <ul>
              <li>
                1 ANB:El equipo de casa ganará el partido. Si el equipo huésped
                gana el partido, el importe apostado será reembolsado.
              </li>
              <li>
                X ANB: El resultado será empate. Si el equipo de fuera gana el
                partido, el importe apostado será reembolsado.
              </li>
            </ul>
            <p>
              Más/Menos: Tienes que predecir si el número total de goles
              marcados durante el partido será mayor o menor al número indicado.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                Más: El número total de goles marcados durante el partido será
                superior al número indicado
              </li>
              <li>
                Menos: El número total de goles marcados durante el partido
                estará bajo el número indicado
              </li>
            </ul>
            <p>
              Odd/Even: Hay que pronosticar si el número total de goles marcados
              durante el partido será impar o par El resultado de 0-0 se
              considera par Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>Odd:El número total de goles marcados será impar.</li>
              <li>Even:El número total de goles marcados será par.</li>
            </ul>
            <p>
              O/E H/A: Hay que pronosticar si el número total de goles marcados
              por parte de equipo de casa o equipo huésped será impar o par. En
              el caso de que equipo elegido no marque, el resultado será
              considerado como par Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>
                El número de goles marcados por parte de equipo de casa será
                impar.
              </li>
              <li>
                H Even: El número de goles marcados por parte de equipo de casa
                será par
              </li>
              <li>
                A Odd: El número de goles marcados por parte de equipo huésped
                será impar.
              </li>
              <li>
                A Even: El número de goles marcados por parte de equipo huésped
                será par.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet16"
            aria-controls="bet16"
            class="help__header--sub accordion-button collapsed"
          >
            Golf
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet16"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Winner: Tienes que pronosticar si el jugador seleccionado ganará
              el torneo. Tipos de apuestas disponibles en este mercad
            </p>
            <ul>
              <li>Winner: El golfista seleccionado ganará el torneo</li>
              <li>
                No Winner: El golfista seleccionado no va a ganar el torneo
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet17"
            aria-controls="bet17"
            class="help__header--sub accordion-button collapsed"
          >
            Balonmano
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet17"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Handicap: El resultado de la apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final del partido. El
              valor de handicap se refiere siempre al equipo local. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 H: El equipo local anotará más goles que el equipo visitante
                (considerando el handicap).
              </li>
              <li>
                2 H: El equipo visitante marcará más goles que el equipo local
                (considerando el handicap).
              </li>
            </ul>
            <p>
              1X2: Tienes que pronosticar al ganador del partido. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1:El equipo de casa ganará el partido.</li>
              <li>X: El resultado será empate</li>
              <li>2:El equipo huésped ganará el partido</li>
            </ul>
            <p>
              DC:Hay que pronosticar el ganador del partido eligiendo una de las
              opciones disponibles Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>
                1XDC:El equipo de casa ganará el partido o el resultado será
                empate
              </li>
              <li>
                12DC: El equipo de casa o el equipo huésped ganará el partido
              </li>
              <li>
                X2DC:El equipo huésped ganará el partido o el resultado será
                empate
              </li>
            </ul>
            <p>
              DNB:Hay que pronosticar el equipo que ganará en el partido. En el
              caso de empate, el importe apostado será reembolsado. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 DNB: El equipo de casa ganará el partido. En el caso de
                empate, el importe apostado será reembolsado.
              </li>
              <li>
                2 DNB: El equipo huésped ganará el partido. En el caso de
                empate, el importe apostado será reembolsado.
              </li>
            </ul>
            <p>
              Más/Menos:Tienes que predecir si el número total de goles marcados
              durante el partido será mayor o menor al número indicado. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                Más: El número total de goles marcados en el partido será
                superior al número indicado
              </li>
              <li>
                Menos: El número total de goles marcados en el partido estará
                bajo el número indicado
              </li>
            </ul>
            <p>
              Odd/Even: Hay que pronosticar si el número total de goles marcados
              durante el partido será impar o par Tipos de apuestas disponibles
              en este mercado:
            </p>
            <ul>
              <li>Odd:El número total de goles marcados será impar.</li>
              <li>Even:El número total de goles marcados será par.</li>
            </ul>
            <p>
              Odd/Even Home/Away: Hay que pronosticar si el número total de
              goles marcados por parte de equipo de casa o equipo huésped será
              impar o par. Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                El número de goles marcados por parte de equipo de casa será
                impar.
              </li>
              <li>
                H Even: El número de goles marcados por parte de equipo de casa
                será par.
              </li>
              <li>
                A Odd: El número de goles marcados por parte de equipo huésped
                será impar.
              </li>
              <li>
                A Even: El número de goles marcados por parte de equipo huésped
                será par.
              </li>
            </ul>
            <p>
              First 1H Bets: Todas las apuestas relacionadas con la PRIMERA
              PARTE, seguirán la misma especificación que los resultados
              finales, pero el resultado se decidirá a la mano de la primera
              parte del juego.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet18"
            aria-controls="bet18"
            class="help__header--sub accordion-button collapsed"
          >
            Hockey Sobre Hielo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet18"
            class="help__body accordion-collapse collapse"
          >
            <p>
              H/H:Tienes que pronosticar el equipo que va a ganar el partido.
              Las apuestas se liquidan en la puntuación al final del partido,
              incluyendo eventuales prórrogas y penaltis. Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>1 HH : El equipo local ganará el partido.</li>
              <li>2 HH: The away team will win the match.</li>
            </ul>
            <p>
              Handicap:El resultado de la apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final del partido. El
              valor de handicap se refiere siempre al equipo local. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 H: El equipo local anotará más goles que el equipo visitante
                (considerando el handicap).
              </li>
              <li>
                2 H: El equipo visitante marcará más goles que el equipo local
                (considerando el handicap).
              </li>
            </ul>
            <p>
              1X2:Tienes que pronosticar al ganador del partido. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1:El equipo de casa ganará el partido.</li>
              <li>X: El resultado será empate</li>
              <li>2:El equipo huésped ganará el partido</li>
            </ul>
            <p>
              DC:Hay que pronosticar el ganador del partido eligiendo una de las
              opciones disponibles Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>
                1XDC:El equipo de casa ganará el partido o el resultado será
                empate
              </li>
              <li>
                12DC: El equipo de casa o el equipo de fuera ganará el partido
              </li>
              <li>
                X2DC:El equipo de fuera ganará el partido o el resultado será
                empate
              </li>
            </ul>
            <p>1X2 No Bet</p>
            <p>
              HNB: Tienes que predecir el resultado del partido. En caso de que
              el equipo local gane el partido, se devolverá la apuesta. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                X HNB: Habrá un empate. En caso de que el equipo local gane el
                partido, se devolverá la apuesta.
              </li>
              <li>
                2 HNB: El equipo visitante ganará el partido. En caso de que el
                equipo local gane el partido, se devolverá la apuesta.
              </li>
            </ul>
            <p>
              DNB: Tienes que pronosticar el equipo que ganará en el partido. En
              el caso de empate, el importe apostado será reembolsado. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 DNB: El equipo de casa ganará el partido. En el caso de
                empate, el importe apostado será reembolsado.
              </li>
              <li>
                2 DNB: El equipo de fuera ganará el partido. En el caso de
                empate, el importe apostado será reembolsado.
              </li>
            </ul>
            <p>
              ANB: Hay que pronosticar cuál equipo ganará el partido Si el
              equipo de fuera gana el partido, el importe apostado será
              reembolsado. Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 ANB:El equipo de casa ganará el partido. Si el equipo huésped
                gana el partido, el importe apostado será reembolsado.
              </li>
              <li>
                X ANB: El resultado será empate. Si el equipo de fuera gana el
                partido, el importe apostado será reembolsado.
              </li>
            </ul>
            <p>
              Más/Menos:Tienes que predecir si el número total de goles marcados
              durante el partido será mayor o menor al número indicado. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                Más: El número total de goles marcados durante el partido será
                superior al número indicado
              </li>
              <li>
                Menos: El número total de goles marcados durante el partido
                estará bajo el número indicado
              </li>
            </ul>
            <p>
              Odd/Even: Hay que pronosticar si el número total de goles marcados
              durante el partido será impar o par. Un resultado de 0-0 se
              considera igual. Tipos de apuestas disponibles en este mercado:
            </p>
            <p>
              Odd/Even: Hay que pronosticar si el número total de goles marcados
              durante el partido será impar o par. Un resultado de 0-0 se
              considera igual. Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>Odd:El número total de goles marcados será impar.</li>
              <li>Even:El número total de goles marcados será par.</li>
            </ul>
            <p>
              1X2 1st P: Tienes que pronosticar el resultado al final del primer
              período. Si el partido se interrumpe después de que el primer
              período ya haya terminado, las apuestas se mantendrán. En este
              caso, no se considerará una eventual coincidencia repetida. Tipos
              de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 1st P: El equipo local ganará al final del primer período.
              </li>
              <li>X 1st P: Habrá empate al final del primer período.</li>
              <li>
                2 1st P: El equipo visitante ganará al final del primer período.
              </li>
            </ul>
            <p>
              DC 1st Per: Tienes que pronosticar el resultado al final del
              primer período eligiendo una de las selecciones disponibles.Si el
              partido se interrumpe después de que el primer período ya haya
              terminado, las apuestas se mantendrán. En este caso, no se
              considerará una eventual partida repetida Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>
                1X DC 1P: El equipo local ganará o habrá un empate al final del
                primer período.
              </li>
              <li>
                12 DC 1P: El equipo local o el equipo visitante ganará al final
                del primer período.
              </li>
              <li>
                X2 DC 1P:El equipo visitante ganará o habrá un empate al final
                del primer período.
              </li>
            </ul>
            <p>
              DNB 1st P:Tienes que predecir qué equipo ganará al final del
              primer período. En caso de empate al final del primer periodo, se
              devolverá la apuesta. Si el partido se interrumpe después de que
              el primer período ya haya terminado, las apuestas se mantendrán.
              En este caso, no se considerará una eventual coincidencia
              repetida.Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 DNB 1P: El equipo local ganará al final del primer período. En
                caso de empate al final del primer periodo, se devolverá la
                apuesta.
              </li>
              <li>
                2 DNB 1P: El equipo visitante ganará al final del primer
                período. En caso de empate al final del primer periodo, se
                devolverá la apuesta.
              </li>
            </ul>
            <p>
              HNB 1P Tienes que predecir el resultado del primer período. En
              caso de que el equipo local gane al final del primer período, se
              le devolverá la participación. Si el partido se interrumpe después
              de que el primer período ya haya terminado, las apuestas se
              mantendrán. En este caso, no se considerará una eventual
              coincidencia repetida. Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>
                X HNB 1P: Habrá empate al final del primer período. En caso de
                que el equipo local gane al final del primer período, se le
                devolverá la participación.
              </li>
              <li>
                2 HNB 1P: El equipo visitante ganará al final del primer
                período. En caso de que el equipo local gane al final del primer
                período, se le devolverá la participación.
              </li>
            </ul>
            <p>
              ANB 1P: Tienes que predecir el resultado del primer período. En
              caso de que el equipo visitante gane al final del primer período,
              se le devolverá la participación. Si el partido se interrumpe
              después de que el primer período ya haya terminado, las apuestas
              se mantendrán. En este caso, no se considerará una eventual
              coincidencia repetida. Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>
                1 ANB 1P: El equipo local ganará al final del primer período. En
                caso de que el equipo visitante gane al final del primer
                período, se le devolverá la participación.
              </li>
              <li>
                X ANB 1P: Habrá un empate al final del primer período. En caso
                de que el equipo visitante gane al final del primer período, se
                le devolverá la participación.
              </li>
            </ul>
            <p>
              O/U 1P:Tienes que predecir si el número total de goles marcados
              durante el primer período será mayor o menor al número indicado.
              Si el partido se interrumpe después de que el primer período ya
              haya terminado, las apuestas se mantendrán. En este caso, no se
              considerará una eventual coincidencia repetida. Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>
                Over 1P: El número total de goles marcados durante el primer
                período será superior al número indicado.
              </li>
              <li>
                Under 1P: El número total de goles marcados durante el primer
                período estará debajo del número indicado.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet19"
            aria-controls="bet19"
            class="help__header--sub accordion-button collapsed"
          >
            Deportes de Motor
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet19"
            class="help__body accordion-collapse collapse"
          >
            <p>
              “Winner (Race)”: Tienes que predecir el conductor que va a ganar
              la carrera;
            </p>
            <p>
              “Winning Team (Race)” Tienes que predecir a qué equipo pertenece
              el piloto que va a ganar la carrera;
            </p>
            <p>
              “Winning Team (Race)”: Tienes que predecir a qué equipo pertenece
              el piloto que va a ganar la carrera;
            </p>
            <p>
              “1st And 2nd (Race)”:Tienes que predecir que los conductores de
              remolque seleccionados obtendrán la primera y segunda posición al
              final de la carrera en orden exacto;
            </p>
            <p>
              “1st Or 2nd (Race)”: Tienes que predecir que el conductor
              seleccionado obtendrá la primera o segunda posición al final de la
              carrera;
            </p>
            <p>
              “Podium (Race)”: Tienes que predecir que el piloto seleccionado
              podrá llegar al podio (las primeras tres posiciones);
            </p>
            <p>
              “HH (Race)”:Tienes que predecir qué conductor, en las parejas de
              vez en cuando se propone obtener la mejor colocación en la
              carrera. Sera notificado, en caso de que ambos pilotos sean
              descalificados o se retiren de la carrera durante la misma vuelta,
              todas las apuestas se considerarán nulas. Incluso en caso de que
              uno de los dos pilotos (o incluso ambos), por alguna razón no
              participe en la carrera oficial, todas las apuestas asociadas con
              ellos serán consideradas nulas;
            </p>
            <p>
              “Winner (Pole)”: Tienes que predecir el conductor que ganará la
              "pole position" durante la calificación oficia
            </p>
            <p>
              “1st And 2nd (Pole)”.Tienes que seleccionar dos pilotos de la
              lista y predecir quiénes, respectivamente, y en el orden correcto,
              estarán en la primera y segunda posición al final de la
              calificación oficial;
            </p>
            <p>
              “Podium (Pole)”: Tienes predecir que el piloto seleccionado podrá
              llegar al podio al final de la calificación oficial (es decir, al
              menos una de las tres primeras posiciones de la parrilla);
            </p>
            <p>
              “HH (Pole)”: Tienes que predecir qué conductor, en las parejas de
              vez en cuando se propone obtener la mejor colocación durante la
              calificación oficial. Puede ser notificado que, en caso de que uno
              o ambos pilotos no puedan completar una vuelta completa durante la
              clasificación oficial, todas las apuestas relacionadas se
              considerarán nulas;
            </p>
            <p>
              “Best Of Group”: Tienes que predecir que el conductor seleccionado
              ganará la mejor posición entre todos los conductores en el grupo.
              En caso de que uno o más pilotos no participen en la carrera,
              todas las apuestas serán consideradas nulas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet20"
            aria-controls="bet20"
            class="help__header--sub accordion-button collapsed"
          >
            Poker
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet20"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Ganador: Tienes pronosticar si el competidor seleccionado ganará
              el torneo. Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                Ganador: Los competidores seleccionados ganarán el torneo.
              </li>
              <li>
                No ganador: El competidor seleccionado no ganará el torneo.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet21"
            aria-controls="bet21"
            class="help__header--sub accordion-button collapsed"
          >
            Remo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet21"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Hand. 1-2: El resultado de la apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final del partido. El
              valor del handicap se refiere siempre al equipo de casa. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 H: El equipo local anotará más goles que el equipo visitante
                (considerando el handicap).
              </li>
              <li>
                2 H: El equipo visitante marcará más goles que el equipo local
                (considerando el handicap).
              </li>
            </ul>
            <p>
              1X2: Tienes que pronosticar al ganador del partido. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1:El equipo de casa ganará el partido.</li>
              <li>X: El resultado será empate</li>
              <li>2:El equipo huésped ganará el partido</li>
            </ul>
            <p>
              DC:Hay que pronosticar el ganador del partido eligiendo una de las
              opciones disponibles Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>
                1XDC:El equipo de casa ganará el partido o el resultado será
                empate
              </li>
              <li>
                12DC: El equipo de casa o el equipo de fueraganará el partido
              </li>
              <li>
                X2DC:El equipo de fuera ganará el partido o el resultado será
                empate
              </li>
            </ul>
            <p>
              HT/FT: Es necesario pronosticar el resultado al final de la
              primera parte y al final del partido en la misma apuesta,
              eligiendo una de las selecciones disponibles. Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>
                1/1: El equipo local ganará al final de la primera mitad y al
                final del partido.
              </li>
              <li>
                1/X: El equipo local ganará al final de la primera mitad y habrá
                un empate al final del partido.
              </li>
              <li>
                1/2: El equipo local ganará al final de la primera mitad y el
                equipo visitante ganará el final del partido.
              </li>
              <li>
                X/1: Habrá un empate al final de la primera mitad y el equipo
                local ganará al final del partido.
              </li>
              <li>
                X/X: Habrá un empate al final de la primera parte y al final del
                partido.
              </li>
              <li>
                X/2: Habrá un empate al final de la primera mitad y el equipo
                visitante ganará al final del partido.
              </li>
              <li>
                2/1: El equipo visitante ganará al final de la primera parte y
                el equipo local ganará al final del partido.
              </li>
              <li>
                2/X: El equipo visitante ganará al final de la primera mitad y
                habrá un empate al final del partido.
              </li>
              <li>
                2/2: El equipo visitante ganará al final de la primera parte y
                al final del partido.
              </li>
            </ul>
            <p>
              Más/Menos: Tienes que predecir si el número total de puntos
              anotados durante el partido será más o menos el número indicado.
              Tipos de apuestas disponibles en este mercad:
            </p>
            <ul>
              <li>
                Over: El número total de puntos anotados durante el partido será
                superior al número indicado.
              </li>
              <li>
                Under: El número total de puntos anotados durante el partido
                estará debajo del número indicado.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet22"
            aria-controls="bet22"
            class="help__header--sub accordion-button collapsed"
          >
            Rugby Union
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet22"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Hand. 1-2:El resultado de la apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final del partido El
              valor de handicap se refiere siempre al equipo local. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 H: El equipo local anotará más goles que el equipo visitante
                (considerando el handicap).
              </li>
              <li>
                2 H: El equipo visitante marcará más goles que el equipo local
                (considerando el handicap).
              </li>
            </ul>
            <p>
              1X2:Tienes que pronosticar al ganador del partido. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1:El equipo de casa ganará el partido.</li>
              <li>X: El resultado será empate</li>
              <li>2:El equipo huésped ganará el partido</li>
            </ul>
            <p>
              DC:Hay que pronosticar el ganador del partido eligiendo una de las
              opciones disponibles Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>
                1XDC:El equipo de casa ganará el partido o el resultado será
                empate
              </li>
              <li>
                12DC: El equipo de casa o el equipo de fueraganará el partido
              </li>
              <li>
                X2DC:El equipo de fuera ganará el partido o el resultado será
                empate
              </li>
            </ul>
            <p>
              HT/FT: Es necesario pronosticar el resultado al final de la
              primera mitad y al final del partido en la misma apuesta,
              eligiendo una de las selecciones disponibles. Tipos de apuestas
              disponibles en este mercadO:
            </p>
            <ul>
              <li>
                1/1: El equipo local ganará al final de la primera mitad y al
                final del partido.
              </li>
              <li>
                1/X: El equipo local ganará al final de la primera mitad y habrá
                un empate al final del partido.
              </li>
              <li>
                1/2: El equipo local ganará al final de la primera mitad y el
                equipo visitante ganará el final del partido.
              </li>
              <li>
                X/1: Habrá un empate al final de la primera mitad y el equipo
                local ganará al final del partido.
              </li>
              <li>
                X/X: Habrá un empate al final de la primera parte y al final del
                partido.
              </li>
              <li>
                X/2: Habrá un empate al final de la primera mitad y el equipo
                visitante ganará al final del partido.
              </li>
              <li>
                2/1: El equipo visitante ganará al final de la primera parte y
                el equipo local ganará al final del partido.
              </li>
              <li>
                2/X: El equipo visitante ganará al final de la primera mitad y
                habrá un empate al final del partido.
              </li>
              <li>
                2/2: El equipo visitante ganará al final de la primera parte y
                al final del partido.
              </li>
            </ul>
            <p>
              Más/Menos: Tienes que predecir si el número total de puntos
              anotados durante el partido será más o menos el número indicado.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                Más: El número total de puntos anotados durante el partido será
                superior al número indicado.
              </li>
              <li>
                Menos: El número total de puntos anotados durante el partido
                estará debajo del número indicado.
              </li>
            </ul>
            <p>
              Odd/Even: Tienes que pronosticar si el número total de puntos
              anotados en el partido será par o impar. Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>Odd:El número total de goles marcados será impar.</li>
              <li>Even:El número total de goles marcados será par.</li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet23"
            aria-controls="bet23"
            class="help__header--sub accordion-button collapsed"
          >
            Snooker
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet23"
            class="help__body accordion-collapse collapse"
          >
            <p>
              H/H:Tienes que pronosticar el jugador que va a ganar el partido.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1 HH: El primer jugador en la lista ganará el partido</li>
              <li>2 HH: El segundo jugador en la lista ganará el partido.</li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet24"
            aria-controls="bet24"
            class="help__header--sub accordion-button collapsed"
          >
            Fútbol
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet24"
            class="help__body accordion-collapse collapse"
          >
            <p>
              1X2:Tienes que predecir tres resultados posibles: 1 (triunfo del
              equipo local), X (empate) y 2 (triunfo del equipo visitante ).
            </p>
            <p>1-2: You have to predict the winner of the match:</p>
            <p>
              DC (Double Chance):En este caso los tres resultados posibles 1, X,
              2 se están combinando en 3 grupos 1X, 12 y X2.
            </p>
            <p>
              Draw No Bet (DNB): Tienes que predecir qué equipo ganará el
              partido. En caso de empate, la selección será nula (tampoco se
              tomaría en cuenta para un posible bono).
            </p>
            <p>1X2 No Bet:</p>
            <ul>
              <li>
                HNB: tienes que predecir el resultado del partido, si el equipo
                local gana la apuesta se le devolverá.
              </li>
              <li>
                ANB: tienes que predecir el resultado del partido, si el equipo
                visitante gana la apuesta será reembolsado.
              </li>
            </ul>
            <p>1X2 No Bet 1 Half:</p>
            <ul>
              <li>
                HNB 1H: Tienes que predecir el resultado de la primera mitad, si
                el equipo local gana la apuesta se le devolverá.
              </li>
              <li>
                DNB 1H: tienes que predecir el resultado de la primera mitad, si
                el resultado es un empate la apuesta será devuelta.
              </li>
              <li>
                ANB 1H: usted tiene que predecir el resultado de la primera
                mitad, si el equipo visitante gana la apuesta será reembolsado.
              </li>
            </ul>
            <p>1X2 No Bet 2 Half:</p>
            <ul>
              <li>
                HNB 2H: tienes que predecir el resultado de la segunda mitad, si
                el equipo local gana la apuesta se le devolverá.
              </li>
              <li>
                DNB 2H: tienes que predecir el resultado de la segunda mitad, si
                el resultado es un empate la apuesta será devuelta.
              </li>
              <li>
                ANB 2H: tienes que predecir el resultado de la segunda mitad, si
                el equipo visitante gana la apuesta será devuelto.
              </li>
            </ul>
            <p>
              Ganar las dos mitades:Tienes que predecir que el equipo
              seleccionado gana ambas partes.
            </p>
            <ul>
              <li>
                Local SI: Tienes que predecir que el equipo local gana ambas
                mitades.
              </li>
              <li>
                Local NO: Tienes que predecir que el equipo local no gana las
                dos mitades.
              </li>
              <li>
                Visitante SI: Tienes que predecir que el equipo visitante gana
                ambas mitades.
              </li>
              <li>
                Visitante NO: Tienes que predecir que el equipo visitante no
                gana las dos mitades.
              </li>
              <li>
                Local o Visitante SI: Tienes que predecir que el equipo casero o
                el equipo ausente gana ambas mitades.
              </li>
              <li>
                Local o Visitante NO: Tienes que predecir que el equipo de casa
                o el equipo ausente no gana ambas mitades.
              </li>
            </ul>
            <p>
              Puntuación correcta: La puntuación correcta del juego debe
              predecirse exactamente.
            </p>
            <p>
              HT/FT: Tienes que predecir el resultado de la primera mitad y el
              resultado a tiempo completo en la misma apuesta.
            </p>
            <p>
              1X2 Halftime: Tienes que predecir el resultado de la primera
              mitad: 1 1er HT (el equipo local tendrá la ventaja después de la
              primera mitad del tiempo); X 1 ª HT (será un empate) o 2 1 ª HT
              (el equipo visitante va ganando).
            </p>
            <p>
              1X2 2nd Half:Tienes que predecir sólo la puntuación del segundo
              tiempo medio, sin tener en cuenta la puntuación en el medio
              tiempo.
            </p>
            <p>
              Handicap:El resultado de una apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final. La meta o las
              metas de ventaja se muestran entre paréntesis:
            </p>
            <ul>
              <li>
                Ej: (0: 1) el equipo local tiene una ventaja de meta, (1: 0), el
                equipo local tiene una ventaja de gol.
              </li>
              <li>
                1H (0: 1): el equipo local debe ganar con 2 o más goles de
                diferencia.
              </li>
              <li>
                XH (0: 1): el equipo local debe ganar con exactamente 1 gol de
                diferencia.
              </li>
              <li>
                1H (1: 0): el partido debe terminar con un empate o el equipo
                local debe ganar.
              </li>
              <li>
                XH (1: 0): el equipo visitante debe ganar con exactamente 1 gol
                de diferencia
              </li>
              <li>
                2H (1: 0): el equipo visitante debe ganar con 2 o más goles de
                diferencia.
              </li>
              <li>
                1H (0: 2): el equipo local debe ganar con 3 o más goles de
                diferencia.
              </li>
              <li>
                XH (0: 2): el equipo local debe ganar con exactamente 2 goles de
                diferencia.
              </li>
              <li>
                2H (0: 2): el equipo local debe ganar exactamente con 1 gol de
                diferencia, el partido debe terminar en empate, o el equipo
                visitante debe ganar.
              </li>
              <li>
                1H (2: 0): el equipo local debe ganar, el partido debe terminar
                en empate o el equipo visitante debe ganar exactamente con 1 gol
                de diferencia.
              </li>
              <li>
                XH (2: 0): el equipo visitante debe ganar exactamente con 2
                goles de diferencia.
              </li>
              <li>
                2H (2: 0): el equipo visitante debe ganar con 3 o más goles de
                diferencia.
              </li>
              <li>
                1H (0: 3): el equipo local debe ganar con 4 o más goles de
                diferencia.
              </li>
              <li>
                XH (0: 3): el equipo local debe ganar exactamente con 3 goles de
                diferencia.
              </li>
              <li>
                2H (0: 3): el equipo local debe ganar con 2 o menos goles de
                diferencia, el partido debe terminar en empate, o el equipo
                visitante debe ganar.
              </li>
              <li>
                1H (3: 0): el equipo local debe ganar, el partido debe terminar
                en empate, o el equipo visitante debe ganar con una diferencia
                de 2 o menos goles.
              </li>
              <li>
                XH (3: 0): el equipo visitante debe ganar con exactamente 3
                goles de diferencia.
              </li>
              <li>
                2H (3: 0): el equipo visitante debe ganar con 4 o más goles de
                diferencia.
              </li>
            </ul>
            <p>
              Más/Menos: Predecir si habrá más o menos goles marcados que el
              número indicado:
            </p>
            <ul>
              <li>
                Más / Menos de 0,5 (el resultado 0-0 está debajo y todos los
                demás resultados son más);
              </li>
              <li>
                Más / Menos de 1,5 (0 o 1 objetivo está debajo, 2 o más goles
                son más);
              </li>
              <li>
                Más / Menos de 2,5 (0, 1 o 2 goles están debajo mientras que 3 o
                más metas son más);
              </li>
              <li>
                Más de / Menos de 3.5 (si hay 0, 1, 2 o 3 goles anotados, la
                selección ganadora está debajo, mientras que 4 o más goles hacen
                que la selección gane).
              </li>
            </ul>
            <p>
              1a Mitad Más/Menos: Predecir si habrá más o menos goles, anotados
              en la primera mitad, que el número de referencia indicado.
            </p>
            <p>
              2a Mitad Más/Menos:Predecir si habrá más o menos goles, anotados
              en la segunda mitad, que el número de referencia indicado.
            </p>
            <p>
              Puntuación / Sin Puntuación:Tienes que predecir si el equipo
              seleccionado (en casa o fuera) marcará algun gol o no.
            </p>
            <p>
              Total de goles: Tienes que predecir el número total de goles
              marcados o no anotados por los dos equipos durante el partido (de
              un mínimo de 1 a un máximo de 6).
            </p>
            <ul>
              <li>1 Gol: El número total de goles será de 1.</li>
              <li>1 Gol No: El número total de goles no será 1.</li>
              <li>2 Gol: El número total de goles será de 2.</li>
              <li>2 Gol No: El número total de goles no será 2.</li>
              <li>3 Gol: El número total de goles será de 3.</li>
              <li>3 Gol No: El número total de goles no será 3.</li>
              <li>4 Gol: El número total de goles será de 4.</li>
              <li>4 Gol No: El número total de goles no será 4.</li>
              <li>5 Gol: El número total de goles será de 5.</li>
              <li>5 Gol No: El número total de goles no será de 5.</li>
              <li>6 Gol: El número total de goles será de 6.</li>
              <li>6 Gol No: El número total de goles no será de 6.</li>
            </ul>
            <p>
              Total de goles 1a Parte:Tienes que predecir el número exacto de
              goles marcados en la primera mitad entre las alternativas
              propuestas:
            </p>
            <ul>
              <li>
                1G | 1H: Tienes que predecir que en la primera mitad sólo 1 gol
                será anotado.
              </li>
              <li>
                2G | 1H: Tienes que predecir que en la primera mitad 2 goles
                serán anotados.
              </li>
              <li>
                3G | 1H: Tienes que predecir que en la primera mitad 3 goles
                serán anotados.
              </li>
              <li>
                1G | N 1H: Tienes que predecir que en la primera mitad no se
                anotará sólo 1 gol.
              </li>
              <li>
                2G | N 1H: Tienes que predecir que en la primera mitad 2 goles
                no serán anotados.
              </li>
              <li>
                3G | N 1H: Tienes que predecir que en la primera mitad 3 goles
                no serán anotados.
              </li>
            </ul>
            <p>
              Total de goles 2a Parte: Tienes que predecir el número exacto de
              goles marcados en la segunda mitad entre las alternativas
              propuestas:
            </p>
            <ul>
              <li>
                1Gl 2H: Tienes que predecir que en la segunda mitad sólo 1 gol
                será anotado.
              </li>
              <li>
                2Gl 2H: Tienes que predecir que en la segunda mitad 2 goles
                serán anotados.
              </li>
              <li>
                3Gl 2H: Tienes que predecir que en la segunda mitad 3 goles
                serán anotados.
              </li>
              <li>
                1G|N 2H: Tienes que predecir que en la segunda mitad no se
                anotará sólo 1 gol.
              </li>
              <li>
                2G|N 2H: Tienes que predecir que en la segunda mitad 2 goles no
                serán anotados.
              </li>
              <li>
                3G|2H: Tienes que predecir que en la segunda mitad 3 goles no
                serán anotados.
              </li>
            </ul>
            <p>
              Total de Goles HT:Tienes predecir el número total de goles que se
              marcarán durante la primera mitad: 1º HT 1+ (uno o más goles); 1º
              HT 2+ (dos o más goles); 1º HT 3+ (tres o más goles); O durante la
              segunda mitad: 2º HT 2+ (dos o más goles); 2º HT 3+ (tres o más
              goles).
            </p>
            <p>
              Odd/Even: Tienes que predecir si el total de goles marcados en un
              partido va a ser par o impar. El resultado 0-0 se considera igual.
            </p>
            <p>
              1er Gol: Tienes que predecir qué equipo marcará el primer gol del
              partido. En caso de que el partido termine con 0-0, la selección
              ganadora será "X".
            </p>
            <ul>
              <li>
                1-1 ° Gl: El equipo local marcará el primer gol del partido.
              </li>
              <li>X-1 ° Gl: Ningún equipo marcará en el partido.</li>
              <li>
                2-1 ° Gl: El equipo visitante marcará el primer gol del partido.
              </li>
            </ul>
            <p>
              1°Goal DC: Tienes que predecir qué equipo marcará el primer gol
              del partido, eligiendo entre las dos posibilidades.
            </p>
            <ul>
              <li>
                1X-1 °Gl: El equipo local marcará el primer gol del partido, o
                no habrá gol.
              </li>
              <li>
                X2-1 °Gl: El equipo visitante marcará el primer gol del partido,
                o no habrá gol.
              </li>
            </ul>
            <p>
              1°Goal DNB:Tienes que predecir qué equipo marcará el primer gol
              del partido, eligiendo entre las dos posibilidades.
            </p>
            <ul>
              <li>
                1DNB-1° Gl: El equipo local marcará el primer gol del partido.
                En caso de que no se anoten goles, se devolverá la apuesta.
              </li>
              <li>
                2DNB-1 ° Gl: El equipo visitante marcará el primer gol del
                partido. En caso de que no se anoten goles, se devolverá la
                apuesta.
              </li>
            </ul>
            <p>
              HT More Goals: Tienes que predecir en qué fracción del juego
              (primera o segunda mitad) más goles serán anotados. Si el mismo
              número de goles se anota en la primera y segunda mitad, o si no se
              anotan goles, la selección ganadora será "X".
            </p>
            <p>
              Multi Goal: Tienes que predecir el número de goles marcados por
              los dos equipos durante el juego.
            </p>
            <p>1-2: You have to predict the winner of the match:</p>
            <p>
              Doble oportunidad 1ª HT: Tienes que predecir el resultado de la
              primera mitad. En este caso hay tres posibles resultados 1, X, 2 y
              siempre se combinan en 3 grupos: 1X, 12 y X2.
            </p>
            <p>
              2a HT Doble Oportunidad: Tienes que predecir el resultado de la
              segunda mitad del partido. En este caso hay tres posibles
              resultados 1, X, 2 y siempre se combinan en 3 grupos: 1X, 12 y X2.
            </p>
            <p>
              1st HT Draw No Bet:Tienes que predecir qué equipo está ganando el
              final de la primera mitad. Si es un empate, la apuesta se anulará
              (y no se considerará una posible bonificación).
            </p>
            <p>
              2nd HT Draw No Bet: Tienes que predecir qué equipo está ganando el
              final de la segunda mitad, sin tener en cuenta las metas que se
              marcaron en la primera mitad. Si es un empate, la apuesta se
              anulará (y no se considerará una posible bonificación).
            </p>
            <p>
              Goal Goal / No Goal (GG / NG) Ofrecemos dos resultados posibles:
            </p>
            <ul>
              <li>
                GG (ambos equipos anotan al menos un gol durante el partido)
              </li>
              <li>
                NG (uno o ambos equipos no anotan ningún gol durante el
                partido).
              </li>
            </ul>
            <p>1st HT Goal Goal / No Goal Dos resultados posibles:</p>
            <ul>
              <li>
                GG (ambos equipos anotan al menos un gol durante la primera
                mitad del partido),
              </li>
              <li>
                NG (un equipo o ambos no consiguen meter durante la primera
                mitad del partido).
              </li>
            </ul>
            <p>2nd HT Goal Goal / No Goal Dos resultados posibles:</p>
            <ul>
              <li>
                GG (ambos equipos anotan al menos un gol durante la segunda
                mitad del partido), NG (un equipo o ambos fallan en la segunda
                mitad del partido).
              </li>
              <li>
                GG &amp; GG: tienes que predecir que ambos equipos marcarán en
                la primera mitad y ambos equipos marcarán en la segunda mitad.
              </li>
              <li>
                GG &amp; NG: tienes que predecir que ambos equipos marcarán en
                la primera mitad y al menos uno de los equipos no marcará en la
                segunda mitad.
              </li>
              <li>
                NG &amp; GG: tienes que predecir que al menos uno de los equipos
                no marcará en la primera mitad y ambos equipos marcarán en la
                segunda mitad.
              </li>
              <li>
                NG &amp; NG: tienes que predecir que al menos uno de los equipos
                no marcará en la primera mitad y al menos uno de los equipos no
                marcará en la segunda mitad.
              </li>
              <li>
                GG &amp; GG No: tienes que predecir que al menos uno de los
                equipos no marcará en la primera mitad, o al menos uno de los
                equipos no marcará en la segunda mitad.
              </li>
              <li>
                GG &amp; NG No: tienes que predecir que al menos uno de los
                equipos no marcará en la primera mitad, o que ambos equipos
                marcarán en la segunda mitad.
              </li>
              <li>
                NG &amp; GG No: tienes que predecir que ambos equipos marcarán
                en la primera mitad, o al menos uno de los equipos no marcará en
                la segunda mitad.
              </li>
              <li>
                NG &amp; NG No: tienes que predecir que ambos equipos anotarán
                en la primera mitad, o que ambos equipos marcarán en la segunda
                mitad.
              </li>
            </ul>
            <p>
              1st HT Odd / Even: Tienes que predecir si la suma de los goles
              marcados durante la primera mitad será par (impar) o impar
              (impar). El resultado 0-0 se considerará igual (Par).
            </p>
            <p>
              2nd HT Odd / Even: Tienes que predecir si la suma de los goles
              marcados en la segunda mitad será impar (Par) o impar (Odd). El
              resultado 0-0 se considerará igual (Par).
            </p>
            <p>
              Number Of Goals:Tienes que predecir el número exacto de goles que
              se marcarán durante el partido.
            </p>
            <p>
              Total Goles Locales: Tienes que predecir el número de goles que
              será anotado por el equipo de casa que elige de las alternativas
              sugeridas.
            </p>
            <ul>
              <li>
                1G | H: Tienes que predecir que el equipo local anotará
                exactamente 1 gol
              </li>
              <li>
                2G | H: Tienes que predecir que el equipo local anotará
                exactamente 2 goles
              </li>
              <li>
                3G | H: Tienes que predecir que el equipo local anotará
                exactamente 3 goles
              </li>
              <li>
                1G | HN: Tienes que predecir que el equipo local no anotará 1
                gol
              </li>
              <li>
                2G | HN: Tienes que predecir que el equipo local no anotará 2
                goles
              </li>
              <li>
                3G | HN: Tienes que predecir que el equipo local no anotará 3
                goles
              </li>
            </ul>
            <p>
              Total Goles Visitante: Tienes que predecir el número de goles que
              será anotado por el equipo de casa que elige de las alternativas
              sugeridas.
            </p>
            <ul>
              <li>
                1G | R: Tiens que predecir que el equipo visitante marcará
                exactamente 1 gol
              </li>
              <li>
                2G | R: Tienes que predecir que el equipo visitante marcará
                exactamente 2 goles
              </li>
              <li>
                3G | R: Tienes que predecir que el equipo visitante anotará
                exactamente 3 goles
              </li>
              <li>
                1G | AN: Tienes que predecir que el equipo visitante no anotará
                1 gol
              </li>
              <li>
                2G | AN: Tienes que predecir que el equipo visitante no anotará
                2 goles
              </li>
              <li>
                3G | AN: Tienes que predecir que el equipo visitante no anotará
                3 goles
              </li>
            </ul>
            <p>
              Multi Goal 1 Half: Tienes que predecir el número total de goles
              anotados en la primera mitad al elegir entre las opciones
              listadas.
            </p>
            <ul>
              <li>
                1-2 G | 1H: Tienes que predecir que en la primera mitad se
                anotará 1 o 2 goles.
              </li>
              <li>
                1-3 G | 1H: Tienes que predecir que en la primera mitad se
                anotará de 1 a 3 goles
              </li>
              <li>
                2-3 G | 1H: Tienes que predecir que en la primera mitad se
                marcarán 2 o 3 goles
              </li>
            </ul>
            <p>
              Multi Goal 2 Half: Tienes que predecir el número total de goles
              anotados en la primera mitad al elegir entre las opciones
              listadas.
            </p>
            <ul>
              <li>
                1-2 G | 2H: Tienes que predecir que en la segunda mitad se
                anotará 1 o 2 goles
              </li>
              <li>
                1-3 G | 2H: Tienes que predecir que en la segunda mitad se
                anotará de 1 a 3 goles
              </li>
              <li>
                2-3 G | 2H: Tienes que predecir que en la segunda mitad se
                marcarán 2 o 3 goles
              </li>
            </ul>
            <p>
              1st HT Correct Score: Tienes que predecir cuál será la puntuación
              correcta al final del primer tiempomedio.
            </p>
            <p>
              2nd HT Correct Score: Tienes que predecir cuál será la puntuación
              correcta al final del segundo tiempo medio, sin tener en cuenta
              los goles que se anotaron en el primer tiempo medio.
            </p>
            <p>
              Home Win To Zero: Tienes que predecir si el equipo local ganará
              dando goles al oponente o no. Hay dos opciones posibles: Sí (el
              equipo local ganará el partido sin marcar ningún gol) y No (el
              equipo local ganará el juego y al menos dará un gol al oponente).
            </p>
            <p>
              Away Win To Zero: Tienes que predecir si el equipo visitante
              ganará marcando goles al oponente o no. Hay dos opciones posibles:
            </p>
            <ul>
              <li>
                Sí (el equipo visitante ganará el partido sin dar ningún gol) y
              </li>
              <li>
                No (el equipo visitante ganará el partido y al menos dará un gol
                al oponente).
              </li>
            </ul>
            <p>
              Winning Margin Home: Tienes que predecir el margen de victoria
              para el equipo local y elegir entre varias alternativas
              sugeridas.&nbsp;El margen de victoria se calcula restando el
              número de goles marcados por el equipo visitante al número de
              goles marcados por el equipo local.
            </p>
            <p>
              Winning Margin Away Tienes que predecir el margen de victoria del
              equipo visitante eligiendo entre varias alternativas sugeridas. El
              margen de victoria se calcula restando el número de goles marcados
              por el equipo local al número de goles marcados por el equipo
              visitante.
            </p>
            <p>
              Penalty Yes / No Tienes que predecir si en el juego se le otorgará
              un penalti a uno de los equipos o no. Las opciones de este tipo de
              apuesta se basan en el resultado obtenido después de la hora
              regular. El tiempo extra y la tanda de penaltis no afectarán el
              resultado de la apuesta.
            </p>
            <p>
              Kick Off:Tienes que predecir qué equipos se patearán al principio
              del partido.
            </p>
            <p>
              Asian Total Over / Under (1, 2, 3 And 4): Si el número de goles
              marcados es menor que la propagación indicada, el impar ganador
              será 'Under'. Si el número de goles marcados es mayor que la
              propagación indicada, el impar ganador será 'Over'. Si el número
              de goles marcados será igual al propagación indicada, la apuesta
              será devuelta.
            </p>
            <p>
              Score First 10 Minutes Las apuestas se basan en los eventos que
              tienen lugar durante los primeros 10 minutos (0:00 a 09:59). Hay
              tres resultados disponibles:
            </p>
            <ul>
              <li>1 = El resultado es 1 antes de los 10 minutos</li>
              <li>2 = El resultado es 2 antes de los 10 minutos</li>
              <li>X = El resultado es X antes de los 10 minutos</li>
            </ul>
            <p>
              1X2 COMBO: Tienes que predecir el resultado del partido 1X2 y al
              mismo tiempo el Over / Under considerando los spreads ofrecidos:
            </p>
            <ul>
              <li>1X2 &amp; O/U 1.5</li>
              <li>1X2 &amp; O/U 2.5</li>
              <li>1X2 &amp; O/U 3.5</li>
            </ul>
            <p>Over/Under 2.5 + Goal Goal:</p>
            <ul>
              <li>
                Over 2,5 + GG ambos equipos marcarán y la suma de los goles será
                3 o más.
              </li>
              <li>
                Under 2,5 + GG ambos equipos anotarán y la suma de los goles
                será inferior a 3.
              </li>
            </ul>
            <p>GG+Over/Under 3,5</p>
            <ul>
              <li>
                GG+ OVER 3,5: Tienes que predecir que ambos equipos marcan y el
                número total de goles es de al menos 4.
              </li>
              <li>
                GG+UNDER 3,5: Tienes que predecir que ambos equipos marcan y el
                número total de goles es menos de 4.
              </li>
            </ul>
            <p>Over/Under 2.5 + NO Goal</p>
            <ul>
              <li>
                Over 2.5 + NG sólo un equipo marcará y la suma de los objetivos
                será 3 o más.
              </li>
              <li>
                Under 2.5 + NG sólo un equipo marcará y la suma de los goles
                será menor de 3.
              </li>
            </ul>
            <p>NG+Over/Under 3,5</p>
            <ul>
              <li>
                NG+Over 3.5: Tienes que predecir que al menos uno de los dos
                equipos no marcó y los goles marcados serán por lo menos 4.
              </li>
              <li>
                NG+Uder 3.5: Tienes que predecir que al menos uno de los dos
                equipos no marcó y los goles marcados serán menos de 4.
              </li>
            </ul>
            <p>1X2 + Goal Goal</p>
            <ul>
              <li>
                El resultado 1 &amp; GG gana si el resultado es 1, y ambos
                equipos marcarán
              </li>
              <li>
                El resultado X &amp; GG gana si el resultado es X, y ambos
                equipos marcarán
              </li>
              <li>
                El resultado 2 &amp; GG gana si el resultado es 2, y ambos
                equipos marcarán
              </li>
            </ul>
            <p>Over/Under 1,5 Both Halves</p>
            <ul>
              <li>
                Over 1.5 BHT YES: Tienes que predecir que en la primera mitad se
                anotará al menos 2 goles, y en la segunda mitad se anotará al
                menos 2 goles.
              </li>
              <li>
                Over 1.5 BHT NO: Tienes que predecir que en la primera mitad se
                anotará como máximo 1 gol, o en la segunda mitad se anotará como
                mucho 1 gol.
              </li>
              <li>
                Under 1.5 BHT YES: Tienes que predecir que en la primera mitad
                se anotará como máximo 1 gol, y en la segunda mitad se anotará
                como mucho 1 gol.
              </li>
              <li>
                Under 1.5 BHT NO: Tienes que predecir que en la primera mitad se
                anotará al menos 2 goles, o en la segunda mitad se anotará al
                menos 2 goles.
              </li>
            </ul>
            <p>
              DC COMBO: Tienes que predecir el resultado de un partido en dos
              tipos de apuestas conectadas, una de las cuales es siempre la
              doble oportunidad.
            </p>
            <ul>
              <li>
                1X&amp;3 + : Tienes que predecir que el equipo local ganará o
                sacará el partido, y 3 o más goles serán anotados.
              </li>
              <li>
                1X&amp;2- : Tienes que predecir que el equipo local ganará o
                sacará el partido, y 2 o menos goles serán anotados.
              </li>
              <li>
                X2&amp;3 + : Tienes que predecir que el equipo visitante ganará
                o sacará el partido, y 3 o más goles serán anotados.
              </li>
              <li>
                X2&amp;2- : Tienes que predecir que el equipo visitante ganará o
                sacará el partido, y 2 o menos goles serán anotados.
              </li>
              <li>
                12&amp;3 + : Tienes que predecir que uno de los dos equipos
                ganará el partido, y 3 o más goles serán anotados.
              </li>
              <li>
                12&amp;2- : Tienes que predecir que uno de los dos equipos
                ganará el partido, y 2 o menos goles serán anotados.
              </li>
              <li>
                1X&amp;GG: Tienes que predecir que el equipo local ganará o
                sacará el partido, y ambos equipos marcarán.
              </li>
              <li>
                1X&amp;NG: Tienes que predecir que el equipo local ganará o
                sacará el partido, y al menos uno de los dos equipos no marcará.
              </li>
              <li>
                X2&amp;GG: Tienes que predecir que el equipo visitante ganará o
                sacará el partido, y ambos equipos marcarán.
              </li>
              <li>
                X &amp;NG: Tienes que predecir que el equipo visitante ganará o
                sacará el partido, y al menos uno de los dos equipos no marcará.
              </li>
              <li>
                12&amp;GG: Tienes que predecir que uno de los dos equipos ganará
                el partido, y ambos equipos marcarán.
              </li>
              <li>
                12 &amp; NG: Tienes que predecir que uno de los dos equipos
                ganará el partido, y al menos uno de los dos equipos no marcará.
              </li>
              <li>
                1X&amp;4 +: Tienes que predecir que el equipo local ganará o
                sacará el partido, y se marcarán 4 o más goles.
              </li>
              <li>
                1X&amp;3-: Tienes que predecir que el equipo local ganará o
                sacará el partido, y 3 o menos goles serán anotados.
              </li>
              <li>
                X2&amp;4 +: Tienes que predecir que el equipo visitante ganará o
                sacará el partido, y se marcarán 4 o más goles.
              </li>
              <li>
                X2&amp;3-: Tienes que predecir que el equipo visitante ganará o
                sacará el partido, y 3 o menos goles serán anotados.
              </li>
              <li>
                12&amp;4 +: Tienes que predecir que uno de los dos equipos
                ganará el partido, y 4 o más goles serán anotados.
              </li>
              <li>
                12&amp;3-: Tienes que predecir que uno de los dos equipos ganará
                el partido, y 3 o menos goles serán anotados.
              </li>
              <li>
                1X&amp;2 +: Tienes que predecir que el equipo local ganará o
                sacará el partido, y 2 o más goles serán anotados.
              </li>
              <li>
                1X&amp;1-: Tienes que predecir que el equipo local ganará o
                sacará el partido, y 0 o 1 gol será anotado.
              </li>
              <li>
                X2&amp;2 +: Tienes que predecir que el equipo visitante ganará o
                sacará el partido, y se marcarán 2 o más goles.
              </li>
              <li>
                X2&amp;1-: Tienes que predecir que el equipo visitante ganará o
                sacará el partido, y se marcará 0 o 1 gol.
              </li>
              <li>
                12&amp;2 +: Tienes que predecir que uno de los dos equipos
                ganará el partido, y 2 o más goles serán anotados.
              </li>
              <li>
                12&amp;1-: Tienes que predecir que uno de los dos equipos ganará
                el partido, y 0 o 1 gol será anotado.
              </li>
              <li>
                1X&amp;2-3Gls: Tienes que predecir que el equipo local ganará o
                sacará el partido, y 2 o 3 gol será anotado.
              </li>
              <li>
                12&amp;2-3Gls: Tines que predecir que uno de los dos equipos
                ganará el partido, y 2 o 3 gol será anotado
              </li>
              <li>
                X2&amp;2-3Gls: Tienes que predecir que el equipo visitante
                ganará o sacará el partido, y 2 o 3 goles serán anotados.
              </li>
            </ul>
            <p>
              DC COMBO First Half: Es necesario predecir el resultado de la
              primera mitad de un partido apostando en dos tipos de apuestas
              asociadas, una de las cuales es siempre una Doble Oportunidad.
            </p>
            <ul>
              <li>
                1X&amp;GG 1H: Es necesario predecir que el equipo local ganará o
                empatará la primera mitad, y que ambos equipos marcarán en la
                primera mitad.
              </li>
              <li>
                12GG&amp;1H: Es necesario predecir que el equipo local o el
                equipo visitante ganará en la primera mitad, y que ambos equipos
                marcarán en la primera mitad.
              </li>
              <li>
                X2&amp;GG 1H: Es necesario predecir que el equipo visitante
                ganará o empatará la primera mitad, y que ambos equipos marcarán
                en la primera mitad.
              </li>
              <li>
                1X&amp;NG 1H: Es necesario predecir que el equipo local ganará o
                empatará la primera mitad, y que al menos uno de los equipos no
                marcará en la primera mitad
              </li>
              <li>
                12&amp;NG 1H: Es necesario predecir que el equipo local o el
                equipo visitante ganará en la primera mitad, y que al menos uno
                de los equipos no marcará en la primera mitad.
              </li>
              <li>
                X2&amp;NG 1H: Es necesario predecir que el equipo visitante
                ganará o empatará la primera mitad, y que al menos uno de los
                equipos no marcará en la primera mitad.
              </li>
              <li>
                1X&amp;2 + 1H: Es necesario predecir que el equipo local ganará
                o empatará la primera vez, y que en la primera mitad se anotarán
                dos o más goles.
              </li>
              <li>
                12&amp;2 + 1H: Es necesario predecir que el equipo local o el
                equipo visitante empatarán la primera vez, y que en la primera
                mitad se marcarán dos o más goles.
              </li>
              <li>
                X2&amp;2 + 1H: Es necesario predecir que el equipo visitante
                ganará o hará incluso en la primera mitad, y que en la primera
                mitad marcará dos o más goles.
              </li>
              <li>
                1X&amp;1- 1H: Es necesario predecir que el equipo local ganará o
                empatará la primera mitad, y que en la primera mitad se anotará
                0 o 1 gol.
              </li>
              <li>
                X2&amp;1- 1H: Es necesario predecir que el equipo visitante
                ganará o empatará la primera mitad, y que en la primera mitad se
                anotará 0 o 1 gol.
              </li>
            </ul>
            <p>
              DC COMBO Second Half: Tienes que predecir el resultado de la
              segunda mitad de un partido apostando a dos tipos de apuestas
              asociadas, una de las cuales es siempre una Doble Oportunidad.
              Para todos los tipos de apuestas que siguen, sólo los objetivos
              marcados en la segunda mitad se considerarán válidos.
            </p>
            <ul>
              <li>
                1X&amp;GG 2H: Tienes que predecir que el equipo local ganará o
                empatará la segunda mitad, y que ambos equipos marcarán en la
                segunda mitad.
              </li>
              <li>
                12GG&amp;2H: Tienes que predecir que el equipo local o el equipo
                visitante ganará en la segunda mitad, y que dos equipos marcarán
                en la segunda mitad.
              </li>
              <li>
                X2&amp;GG 2H: Tienes que predecir que el equipo visitante ganará
                o empatará la segunda mitad, y que ambos equipos marcarán en la
                segunda mitad.
              </li>
              <li>
                1X&amp;NG 2H: Tienes que predecir que el equipo local ganará o
                empatará la segunda parte y que al menos uno de los equipos no
                marcará en la segunda mitad.
              </li>
              <li>
                12&amp;NG 2H: Tienes que predecir que el equipo local o el
                equipo visitante ganará en la segunda mitad, y que al menos uno
                de los equipos no marcará en la segunda mitad.
              </li>
              <li>
                X2&amp;NG 2H: Tienes que predecir que el equipo visitante ganará
                o empatará la segunda mitad y que al menos uno de los equipos no
                marcará en la segunda mitad.
              </li>
              <li>
                1X&amp;2 + 2H: Tienes que predecir que el equipo local ganará o
                empatará la segunda mitad, y que en la segunda mitad se marcarán
                dos o más goles.
              </li>
              <li>
                12&amp;2 + 2H: Tienes que predecir que el equipo local o el
                equipo visitante ganará en la segunda mitad, y que en la segunda
                mitad se marcarán dos o más goles.
              </li>
              <li>
                X2&amp;2 + 2H: Tienes que predecir que el equipo visitante
                ganará o empatará la segunda mitad, y que en la segunda mitad se
                marcarán dos o más goles.
              </li>
              <li>
                1X&amp;1-2H: Tienes que predecir que el equipo local ganará o
                empatará la segunda mitad, y que en la segunda mitad se anotará
                0 o 1 gol.
              </li>
              <li>
                X2&amp;1-2H: Tienes que predecir que el equipo visitante ganará
                o empatará la segunda mitad, y que en la segunda mitad se
                marcará 0 o 1 gol.
              </li>
            </ul>
            <p>
              CHANCE MIX:La apuesta "Chance Mix" permite predecir el resultado
              de un partido de apuestas en dos tipos de apuestas relacionadas.
              Si al menos una selección es correcta, la apuesta es ganadora. En
              caso de que ambas selecciones sean correctas, las ganancias no se
              duplicarán.
            </p>
            <ul>
              <li>
                1o3 +: El equipo local ganará o el número total de goles en el
                partido será de 3 o más.
              </li>
              <li>
                Xo3 +: Los equipos empatarán o el número total de goles en el
                partido será de 3 o más.
              </li>
              <li>
                2o3 +: El equipo visitante ganará o el número total de goles en
                el partido será de 3 o más.
              </li>
              <li>
                1o2-: El equipo local ganará o el número total de goles en el
                partido será de 2 o menos.
              </li>
              <li>
                Xo2-: Los equipos sortearán o el número total de goles en el
                partido será de 2 o menos.
              </li>
              <li>
                2o2-: El equipo visitante ganará o el número total de goles en
                el partido será de 2 o menos.
              </li>
              <li>1oGG: El equipo local ganará o ambos equipos marcarán.</li>
              <li>XoGG: Los equipos empatarán o ambos equipos marcarán.</li>
              <li>
                2oGG: El equipo visitante ganará o ambos equipos marcarán.
              </li>
              <li>
                1oNG: El equipo local ganará o al menos un equipo no marcará."
              </li>
              <li>
                XoNG: Los equipos empataran o al menos un equipo no marcará.
              </li>
              <li>
                2oNG: El equipo visitante ganará o al menos un equipo no marcará
              </li>
              <li>
                1o + A376: A414r4 +: El equipo local ganará el partido o el
                número total de goles en el partido será de 4 o más.
              </li>
              <li>
                2or4 +: El equipo visitante ganará el partido o el número total
                de goles en el partido será de 4 o más.
              </li>
              <li>
                1or3-: El equipo local ganará el partido o el número total de
                goles en el partido será de 3 o menos.
              </li>
              <li>
                2or3-: El equipo visitante ganará el partido o el número total
                de goles en el partido será de 3 o menos.
              </li>
              <li>
                GGor3 +: Ambos equipos marcarán o el número total de goles en el
                partido será 3 o más.
              </li>
              <li>
                NGor2-: Al menos un equipo no marcará durante el partido, o el
                número total de goles será de 2 o menos.
              </li>
              <li>
                NGor3 +: Al menos un equipo no marcará durante el partido, o el
                número total de goles será de 3 o más.
              </li>
              <li>
                GGor2-: Ambos equipos marcarán o el número total de goles en el
                partido será de 2 o menos.
              </li>
              <li>
                Xor4 +: Los equipos empaterán o el número total de goles en el
                partido será de 4 o más.
              </li>
              <li>
                Xor3-: Los equipos empaterán o el número total de goles en el
                partido será de 3 o menos.
              </li>
              <li>
                Xor2 +: Los equipos empaterán o el número total de goles en el
                partido será de 2 o más.
              </li>
              <li>
                Xor1-: Los equipos empaterán o el número total de goles en el
                partido será 1 o menos.
              </li>
              <li>
                1or0G: el equipo local ganará o cero goles serán marcados.
              </li>
              <li>
                2or0G: el equipo visitante ganará o cero goles serán marcados.
              </li>
              <li>
                1or1-: el equipo local ganará o el número total de goles será de
                0 o 1.
              </li>
              <li>
                2or1-: el equipo visitante ganará o el número total de goles
                será 0 o 1.
              </li>
              <li>
                GGor1-: Ambos equipos marcarán o el número total de goles en el
                partido será 0 o 1.
              </li>
              <li>
                1or2 +: el equipo local ganará o el número total de goles será
                de 2 o más.
              </li>
              <li>
                Xor2 +: Los equipos empaterán o el número total de goles será de
                2 o más.
              </li>
              <li>
                2or2 +: el equipo visitante ganará o el número total de goles
                será 2 o más.
              </li>
            </ul>
            <p>
              3COMBO: Tienes que predecir la combinación exacta de los tres
              signos propuestos.
            </p>
            <ul>
              <li>
                1&amp;NG &amp; 2 +: Tienes que predecir que el equipo local
                ganará el partido, el equipo visitante no anotará y que la suma
                de los goles será 2 o más.
              </li>
              <li>
                2&amp;NG&amp;2 +: Tienes que predecir que el equipo visitante
                ganará el partido, el equipo local no anotará y que la suma de
                los goles será 2 o más.
              </li>
              <li>
                1&amp;NG&amp;3 +: Tienes que predecir que el equipo local ganará
                el partido, el equipo visitante no anotará, y que la suma de los
                goles será 3 o más.
              </li>
              <li>
                2&amp;NG&amp;3 +: Tienes que predecir que el equipo visitante
                ganará el partido, el equipo local no anotará y que la suma de
                los goles será 3 o más.
              </li>
              <li>
                Combo 1 Half: Tienes que predecir el resultado de la primera
                mitad de un partido apostando en dos tipos de apuestas
                conectadas. 1&amp;GG 1H :Usted apuesta por el hecho de que el
                equipo local ganará la primera mitad y ambos equipos anotarán en
                la primera mitad.
              </li>
              <li>
                X&amp;GG 1H: Usted apuesta por el hecho de que la primera mitad
                terminará en empate y ambos equipos anotarán en la primera
                mitad.
              </li>
              <li>
                2&amp;GG 1H: Usted apuesta por el hecho de que el equipo
                visitante ganará la primera mitad y ambos equipos anotarán en la
                primera mitad.
              </li>
              <li>
                1&amp;NG 1H: Usted apuesta en el hecho de que el equipo local
                ganará la primera mitad y al menos uno de los dos equipos no
                marcará en la primera mitad.
              </li>
              <li>
                X&amp;NG 1H: Usted apuesta en el hecho de que la primera mitad
                terminará en un empate y al menos uno de los dos equipos no
                marcará en la primera mitad.
              </li>
              <li>
                2&amp;NG 1H: Usted apuesta en el hecho de que el equipo
                visitante ganará la primera mitad y al menos uno de los dos
                equipos no marcará en la primera mitad.
              </li>
              <li>
                1&amp;2 + 1H: Usted apuesta por el hecho de que el equipo local
                ganará la primera mitad y en la primera mitad se marcará 2 o más
                goles.
              </li>
              <li>
                2&amp;2 + 1H: Usted apuesta por el hecho de que el equipo
                visitante ganará la primera mitad y en la primera mitad se
                marcarán 2 o más goles.
              </li>
            </ul>
            <p>
              Combo 2 Half: Tienes que predecir el resultado de la segunda mitad
              de un partido apostando en dos tipos de apuestas conectadas. Para
              el resultado de la apuesta sólo los goles marcados en la segunda
              mitad se tendrán en cuenta.
            </p>
            <ul>
              <li>
                1&amp;GG 2H: Usted apuesta por el hecho de que el equipo local
                ganará la segunda mitad y ambos equipos marcarán en la segunda
                mitad.
              </li>
              <li>
                X&amp;GG 2H: Usted apuesta por el hecho de que la segunda mitad
                terminará en empate y ambos equipos marcarán en la segunda
                mitad.
              </li>
              <li>
                2&amp;GG 2H: Usted apuesta por el hecho de que el equipo
                visitante ganará la segunda mitad y ambos equipos marcarán en la
                segunda mitad.
              </li>
              <li>
                1&amp;NG 2H: Usted apuesta por el hecho de que el equipo local
                ganará la segunda mitad, y al menos uno de los equipos no
                marcará en la segunda mitad.
              </li>
              <li>
                X&amp;NG 2H: Usted apuesta en el hecho de que la segunda mitad
                terminará en un empate y al menos uno de los dos equipos no
                marcará en la segunda mitad.
              </li>
              <li>
                2&amp;NG 2H: Usted apuesta por el hecho de que el equipo
                visitante ganará la segunda mitad, y al menos uno de los equipos
                no marcará en la segunda mitad.
              </li>
              <li>
                1&amp;2 + 2H: Usted apuesta por el hecho de que el equipo local
                ganará la segunda mitad y en la segunda mitad se marcará 2 o más
                goles.
              </li>
              <li>
                2&amp;2 + 2H: Usted apuesta en el hecho de que el equipo
                visitante ganará la segunda mitad y en la segunda mitad se
                marcará 2 o más goles.
              </li>
            </ul>
            <p>
              Multi Goles Locales: Tienes que predecir el número total de goles
              anotados por el equipo local al elegir entre las opciones
              listadas.
            </p>
            <ul>
              <li>
                1-2 Gls H: Apuestas por el hecho de que el equipo local anotará
                1 o 2 goles.
              </li>
              <li>
                1-3 Gls H: Apuestas por el hecho de que el equipo local anotará
                1 a 3 goles.
              </li>
              <li>
                2-3 Gls H: Apuestas por el hecho de que el equipo local anotará
                2 o 3 goles.
              </li>
            </ul>
            <p>
              Multi Goles Visitante Tienes que predecir el número total de goles
              anotados por el equipo local al elegir entre las opciones
              listadas.
            </p>
            <ul>
              <li>
                1-2 Gls A: Apuestas por el hecho de que el equipo visitante
                marcará 1 o 2 goles.
              </li>
              <li>
                1-3 Gls A: Apuestas por el hecho de que el equipo visitante
                marcará 1 a 3 goles.
              </li>
              <li>
                2-3 Gls A: Apuestas por el hecho de que el equipo visitante
                marcará 2 o 3 goles.
              </li>
            </ul>
            <p>
              Over/Under Home/Away 1H: Tienes que predecir si el número de goles
              marcados por el equipo seleccionado al final de la primera mitad
              será mayor o menor que el número indicado.
            </p>
            <ul>
              <li>
                Over Home 0,5 1H :Tienes que predecir que el equipo local marca
                al menos 1 gol al final del primer tiempo.
              </li>
              <li>
                Under Home 0,5 1H : Tienes que predecir que el equipo local no
                anotó al final del primer tiempo.
              </li>
              <li>
                Over Home 1,5 1H : Tienes que predecir que el equipo local marca
                al menos 2 goles al final de laprimera mitad.
              </li>
              <li>
                Under Home 1,5 1H :Tienes que predecir que el equipo local marca
                un máximo de 1 gol al final de la primera mitad.
              </li>
              <li>
                Over Away 0,5 1H : Tienes que predecir que el equipo visitante
                marca al menos 1 gol al final del primer tiempo.
              </li>
              <li>
                Under Away 0,5 1H : Tienes que predecir que el equipo visitante
                no anota ningún gol al final del primer tiempo.
              </li>
              <li>
                Over Away 1,5 1H : Tienes que predecir que el equipo visitante
                marca al menos 2 goles al final de la primera mitad.
              </li>
              <li>
                Under Away 1,5 1H : Tienes que predecir que el equipo visitante
                marca como mucho 1 gol al final de la primera mitad.
              </li>
              <li>
                Over Home 2.5 1H : Tienes que predecir que el equipo local marca
                al menos 3 goles al final de la primera mitad.
              </li>
              <li>
                Under Home 2.5 1H : Tienes que predecir que el equipo local
                marcara más de 2 goles al final de la primera mitad
              </li>
              <li>
                Over Home 3.5 1H :Tienes que predecir que el equipo local
                marcara al menos 4 goles al final de la primera mitad.
              </li>
              <li>
                Under Home 3.5 1H :Tienes que predecir que el equipo local
                marcara al menos 3 goles al final de la primera mitad.
              </li>
              <li>
                Over Away 2.5 1H : Tienes que predecir que el equipo visitante
                marcara al menos 3 goles al final de la primera mitad.
              </li>
              <li>
                Under Away 2.5 1H : Tienes que predecir las puntuaciones del
                equipo visitante en la mayoría de los 2 goles al final de la
                primera mitad.
              </li>
              <li>
                Over Away 3.5 1H : Tienes que predecir que el equipo visitante
                marcara al menos 4 goles al final de la primera mitad.
              </li>
              <li>
                Under Away 3.5 1H : Tienes que predecir las puntuaciones del
                equipo visitante en la mayoría de los 3 goles al final de la
                primera mitad.
              </li>
            </ul>
            <p>
              Over/Under Home/Away 2H: Tienes que predecir si el número de goles
              marcados por el equipo seleccionado en la segunda mitad, será
              mayor o menor que el número indicado.
            </p>
            <ul>
              <li>
                Over Home 0,5 2H :Tienes que predecir que el equipo local marca
                al menos 1 gol en la segunda mitad.
              </li>
              <li>
                Under Home 0,5 2H : Tienes que predecir que el equipo local no
                anota ningún gol en la segunda mitad.
              </li>
              <li>
                Over Home 1,5 2H : Tienes que predecir que el equipo local marca
                al menos 2 goles en la segunda mitad.
              </li>
              <li>
                Under Home 1,5 2H : Tienes que predecir que el equipo casero
                marca como máximo 1 gol en la segunda mitad.
              </li>
              <li>
                Over Away 0,5 2H : Tienes que predecir que el equipo visitante
                marca al menos 1 gol en la segunda mitad.
              </li>
              <li>
                Under Away 0,5 2H :Tienes que predecir que el equipo visitante
                no anota ningún gol en la segunda mitad.
              </li>
              <li>
                Over Away 1,5 2H : Tienes que predecir que el equipo visitante
                marca al menos 2 goles en la segunda mitad.
              </li>
              <li>
                Under Away 1,5 2H :Tienes que predecir que el equipo visitante
                marca como mucho 1 gol en la segunda mitad.
              </li>
              <li>
                Over Home 2.5 2H : Tienes que predecir que el equipo local anota
                al menos 3 goles en la segunda mitad.
              </li>
              <li>
                Under Home 2.5 2H :Tienes que predecir que el equipo casero
                marca como máximo 2 goles en la segunda mitad.
              </li>
              <li>
                Over Home 3.5 2H : Tienes que predecir que el equipo local marca
                al menos 4 goles en la segunda mitad.
              </li>
              <li>
                Under Home 3.5 2H : Tienes que predecir que el equipo local
                anota al menos 3 goles en la segunda mitad.
              </li>
              <li>
                Over Away 2.5 2H : Tienes que predecir que el equipo visitante
                marca al menos 3 goles en la segunda mitad.
              </li>
              <li>
                Under Away 2.5 2H :Tienes que predecir los resultados de la
                distancia en la mayoría de los 2 goles en la segunda mitad.
              </li>
              <li>
                Over Away 3.5 2H: Tienes que predecir el equipo visitante marca
                al menos 4 goles en la segunda mitad.
              </li>
              <li>
                Under Away 3.5 2H :Tienes que predecir el equipo visitante
                puntuación en la mayoría de 3 goles en la segunda mitad.
              </li>
              <li>
                Odd/Even Home: Tienes que predecir si la suma de los goles
                marcados por el equipo local será par (impar) o impar (impar). 0
                se considerará igual (Par).
              </li>
              <li>
                Odd/Even Away: Tienes que predecir si la suma de los goles
                marcados por el equipo visitante será par (impar) o impar
                (impar). 0 se considerará igual (Par).
              </li>
              <li>
                Goal 1H/2H: Tienes que predecir el número de goles que se
                marcarán en la primera y segunda mitad eligiendo entre las
                alternativas ofrecidas.
              </li>
              <li>
                1+&amp;1 +: Tienes que predecir que en la primera mitad se
                anotará al menos 1 gol y en la segunda mitad se anotará al menos
                1 gol.
              </li>
              <li>
                1+&amp;2 +: Tienes que predecir que en la primera mitad se
                anotará al menos 1 gol y en la segunda mitad se anotará al menos
                2 goles.
              </li>
              <li>
                2 +&amp;1 +: Tienes que predecir que en la primera mitad se
                anotarán al menos 2 goles y en la segunda mitad se anotará al
                menos 1 gol.
              </li>
              <li>
                2 +&amp;2 +: Tienes que predecir que en la primera mitad se
                anotarán al menos 2 goles y en la segunda mitad se anotarán al
                menos 2 goles.
              </li>
              <li>
                1 +&amp;3 +: Tienes que predecir que en la primera mitad se
                anotará al menos 1 gol y en la segunda mitad se anotarán al
                menos 3 goles.
              </li>
              <li>
                1- &amp;1-: Tienes que predecir que en la primera mitad se
                anotará como máximo 1 gol y en la segunda mitad se anotará como
                mucho 1 gol.
              </li>
              <li>
                1- &amp;2-: Tienes que predecir que en la primera mitad se
                anotará como máximo 1 gol y en la segunda mitad se anotará como
                máximo 2 goles.
              </li>
              <li>
                1-&amp;3-: Tienes que predecir que en la primera mitad se
                anotará como máximo 1 gol y en la segunda mitad se anotará en la
                mayoría de 3 goles.
              </li>
              <li>
                2- &amp;1-: Tienes que predecir que en la primera mitad se
                anotará como máximo 2 goles y en la segunda mitad se anotará
                como máximo 1 gol.
              </li>
              <li>
                2- &amp;2-: Tienes que predecir que en la primera mitad se
                marcarán como máximo 2 goles y en la segunda mitad se marcarán
                como máximo 2 goles.
              </li>
              <li>
                2- &amp;3-: Tienes que predecir que en la primera mitad se
                anotará en la mayoría de 2 goles y en la segunda mitad se
                anotará en la mayoría de 3 goles.
              </li>
              <li>
                3- &amp;1-: Tienes que predecir que en la primera mitad se
                anotará en la mayoría de 3 goles y en la segunda mitad se
                anotará como mucho 1 gol.
              </li>
              <li>
                1 +&amp;1 + NO: Tienes que predecir que al menos en una de las
                dos mitades no se anotará ningún gol.
              </li>
              <li>
                1 +&amp;2 + NO: Tienes que predecir que en la primera mitad no
                se anotará ningún gol, o en la segunda mitad se anotará como
                mucho 1 gol.
              </li>
              <li>
                2 + &amp;1 + NO: Tienes que predecir que en la primera mitad se
                anotará como máximo 1 gol, o en la segunda mitad no se anotará
                ningún gol.
              </li>
              <li>
                2 + &amp;2 + NO: Tienes que predecir que en la primera mitad se
                anotará como máximo 1 gol o en la segunda mitad se marcará como
                máximo 1 gol.
              </li>
              <li>
                1 + &amp;3 + NO: Tienes que predecir que en la primera mitad no
                se anotará ningún gol, o en la segunda mitad se anotaráN como
                máximo 2 goles.
              </li>
              <li>
                1- &amp;1- NO: Tienes que predecir que en la primera mitad se
                anotará al menos 2 goles, o en la segunda mitad se anotarán al
                menos 2 goles.
              </li>
              <li>
                1- &amp;2- NO: Tienes que predecir que en la primera mitad se
                anotará al menos 2 goles, o en la segunda mitad se anotarán al
                menos 3 goles.
              </li>
              <li>
                1- &amp;3- NO: Tienes que predecir que en la primera mitad se
                anotarán al menos 2 goles, o en la segunda mitad se anotarán al
                menos 4 goles.
              </li>
              <li>
                2- &amp;1- NO: Tienes que predecir que en la primera mitad se
                anotarán al menos 3 goles, o en la segunda mitad se anotarán al
                menos 2 goles.
              </li>
              <li>
                2- &amp;2- NO: Tienes que predecir que en la primera mitad se
                anotarán al menos 3 goles, o en la segunda mitad se anotarán al
                menos 3 goles.
              </li>
              <li>
                2-&amp; 3- NO: Tienes que predecir que en la primera mitad se
                anotará al menos 3 goles, o en la segunda mitad se anotará al
                menos 4 goles.
              </li>
              <li>
                3- &amp;1- NO: Tienes que predecir que en la primera mitad se
                anotarán al menos 4 goles, o en la segunda mitad se anotarán al
                menos 2 goles.
              </li>
            </ul>
            <p>
              Over/Under CORNER:Tienes que predecir si el número total de
              esquinas durante el partido será más alto o más bajo que el spread
              propuesto. Para este tipo de apuesta solo se jugarán las patadas
              de esquina durante el tiempo regular (por lo tanto no se tendrán
              en cuenta los golpes de esquina durante el tiempo extra).
            </p>
            <p>
              TOTAL CARD Over/Under: Para ganar esta apuesta y aprovechar las
              grandes probabilidades disponibles sólo predecir si el número
              total de cartas mostradas a los jugadores de ambos equipos será
              mayor o menor que el spread propuesto. Se especifica que, para los
              propósitos de esta apuesta, el rojo directo exhibido a un jugador
              será contado como una sola carta. Si en el mismo partido el mismo
              jugador recibe doble tarjeta amarilla, resultando en una
              exposición de tarjeta roja, para los propósitos de esta apuesta el
              total de cartas a contar serán sólo dos. Sólo se considerarán las
              cartas mostradas a los jugadores en el campo durante el tiempo del
              partido. Los jugadores inscritos o enviados que no estén en el
              campo en el momento de recibir la tarjeta (por ejemplo, están en
              el banquillo) serán considerados irrelevantes para los propósitos
              de esta apuesta. Las tarjetas mostradas a los jugadores antes del
              inicio del partido o después del final del tiempo regular no serán
              tomadas en cuenta para el cálculo del total de cartas. Las
              tarjetas mostradas a entrenadores o técnicos no contribuyen al
              cálculo del total de tarjetas.
            </p>
            <p>
              MIX Goalscorer (Scorer + Correct Score): En este caso tienes que
              adivinar cualquier anotador del partido y, al mismo tiempo, el
              resultado final exacto. Si el jugador en el que se hizo la apuesta
              no participa en el partido, las apuestas relacionadas serán
              nulas.Si el partido es abandonado, tanto en un empate o después de
              un gol, todas las apuestas se considerarán nulas. En cualquier
              caso, todas las apuestas serán perdedoras si el partido termina
              0-0 o el resultado final no estará presente entre los ofrecidos.
              Para los propósitos de esta apuesta, sólo el tiempo regular será
              considerado (cualquier tiempo extra y penalidades no tendrán
              relevancia). Si el jugador entra en el campo con un resultado real
              que efectivamente hace imposible la ocurrencia del resultado de la
              apuesta (por ejemplo, el jugador entra y el resultado ya es más
              alto que el indicado en la apuesta), todas las apuestas
              relacionadas serán perdedoras.
            </p>
            <p>
              First Substitution: Tienes que predecir qué jugador marcará el
              primer gol del partido y al mismo tiempo cuál será la puntuación
              final correcta. Si el jugador no participa en el partido o entra
              después de que se anote el primer gol, todas las apuestas reales
              serán declaradas nulas. En cualquier caso, todas las apuestas
              serán perdedoras si: el partido termina 0-0; El resultado final no
              está presente entre los propuestos por nosotros; El jugador
              seleccionado será reemplazado antes de que se marque el primer
              gol.
            </p>
            <p>
              Substitution HT: Tienes que predecir si en la primera mitad habrá
              al menos 1 sustitución. 2 posibles resultados: SÍ, NO. Los
              partidos se interrumpen o se aplacan y no se reanude dentro de los
              plazos establecidos en la Sección 8.2, todas las apuestas serán
              consideradas nulas.
            </p>
            <p>Goalscorer</p>
            <ul>
              <li>
                PRIMERO (1): Tienes que predecir el jugador que marcará el
                primer gol en un partido dado. Las apuestas colocadas en otros
                jugadores serán perdedoras. Las selecciones serán anuladas en
                los jugadores que no ingresaron al campo o que ingresaron con 1
                objetivo ya hecho. Si el primer gol será un gol propio, todas
                las apuestas del primer goleador serán perdedoras. Si el
                resultado final es 0-0, todas las apuestas serán perdedoras
                (excepto para los jugadores que no ingresarán al campo durante
                todo el partido).
              </li>
              <li>
                EN CUALQUIER MOMENTO: Tienes que predecir al jugador para anotar
                al menos un gol en un partido dado. Las apuestas colocadas en
                otros jugadores serán perdedoras. Las selecciones serán anuladas
                en los jugadores que no entraron en el campo.
              </li>
              <li>
                ÚLTIMO: Usted tiene que predecir el jugador que marcará el
                último gol en un partido dado. Las apuestas colocadas en otros
                jugadores serán perdedoras. Las selecciones serán anuladas en
                los jugadores que no entraron en el campo.
              </li>
              <li>
                2 + GOL: Tienes que predecir al jugador para marcar 2 goles o
                más en un partido dado. Las apuestas colocadas en otros
                jugadores serán perdedoras. Las selecciones serán anuladas en
                los jugadores que no entraron en el campo.
              </li>
              <li>
                3 + GOL: Tienes que predecir al jugador para anotar 3 goles o
                más en un partido dado. Las apuestas colocadas en otros
                jugadores serán perdedoras. Las selecciones serán anuladas en
                los jugadores que no entraron en el campo.
              </li>
              <li>
                Todas las apuestas pertenecientes a "Goalscorer" será el
                informado y pagado dentro de 48 horas después del final del
                partido.
              </li>
            </ul>
            <p>
              NB: Todas las apuestas de Goalscorer se perderán si la puntuación
              final es de 0-0. Para los propósitos de la apuesta se considerará
              sólo el tiempo regular, cualquier tiempo extra y penalidades, no
              tendrán relevancia.
            </p>
            <p>
              Fantasy Scorer: Tienes que predecir cuál de los dos jugadores, en
              confrontación directa propuesta, marcará el mayor número de goles.
              A los efectos de la apuesta sólo se considerarán los goles
              marcados en tiempo regular:
            </p>
            <ul>
              <li>
                Odd Type 1: El jugador del equipo local marca uno o más goles
                más que el otro jugador.
              </li>
              <li>
                Odd Type X: Los dos jugadores anotan el mismo número de goles (o
                ambos no anotan).
              </li>
              <li>
                Odd Type 2: El jugador del equipo visitante marca uno o más
                goles más que el otro jugador.
              </li>
            </ul>
            <p>
              En este tipo de mercado, en cualquier caso estará disponible
              incluso la doble oportunidad. De todos modos, la apuesta se
              considerará válida sólo si ambos jugadores participarán en el
              partido desde el principio. Si, sin embargo, uno de los jugadores
              no participa desde el primer minuto, la apuesta será nula. Si un
              jugador comienza desde el primer minuto y luego es reemplazado
              durante el partido, la apuesta será considerada válida. Apuestas
              especiales del Soccer
            </p>
            <p>
              TRANSFERENCIAS Se refiere a un jugador que se compra oficialmente
              antes del final de la sesión de negociación (fecha indicada en el
              evento) por los equipos incluidos en la lista. Si el cupón se
              juega después de que al menos una de estas dos compañías anuncie
              oficialmente la transferencia, el cupón se considerará nulo.
            </p>
            <p>
              TOP GOALSCORER Se refiere al jugador que al final del campeonato
              ha anotado más goles. No se tendrá en cuenta ninguna
              descalificación o penalización aplicada después del final de la
              temporada. Si más jugadores terminan la temporada con igual número
              de goles anotados, el impar de cada jugador será dividido por el
              número de jugadores con los mismos objetivos (por ejemplo,
              Immobile: N. Goles 5, Odd 8,00; Tevez: 5 N. Metas 5, Odd 10,00, en
              este caso, los dos jugadores serán los ganadores, pero el impar de
              cada jugador será dividido por 2).
            </p>
            <p>
              DÍA DEL JUGADOR HH (1X2) Se refiere a quién entre 2 jugadores ha
              anotado más goles en el día de referencia, en caso de igual número
              de goles el signo de X estará ganando. El evento es válido no más
              tarde de la fecha de vencimiento generada por el sistema y se
              muestra en el cupón. El evento siempre es válido incluso si uno de
              los 2 jugadores no participa en el partido.
            </p>
            <p>
              JUGADOR HH Se refiere a quién entre 2 jugadores ha anotado más
              goles totales a lo largo de la temporada actual, si el número de
              goles es el mismo, el signo X estará ganando. El evento se
              considerará nulo si al menos uno de los dos jugadores no cuenta un
              total de 15 apariciones en la temporada actual.
            </p>
            <p>
              OBJETIVOS DEL DÍA TOTAL Se refiere al número total de goles
              marcados en el primer día disponible de la liga indicada. Si
              cualquier partido debe ser suspendido o pospuesto y no jugado a la
              medianoche del día después de la fecha originalmente programada
              para el partido, solo se contabilizarán los goles registrados
              durante el día original. Cualquier revancha de rondas anteriores
              no se tendrá en cuenta.
            </p>
            <p>
              PRIMER GOALSCORER DEL DÍA - GRUPOS Se refiere al jugador que
              marque el primer gol entre los jugadores disponibles en el grupo
              seleccionado, considerando minutos efectivos y no la fecha del
              partido. El evento es válido no más tarde de la fecha de
              vencimiento generada por el sistema y se muestra en el cupón. El
              evento siempre es válido incluso si un jugador en esta selección
              no ha jugado el partido.
            </p>
            <p>
              TEAMS HH Se refiere al equipo que al final de la liga tiene una
              mejor posición. Sólo se tendrán en cuenta los resultados
              publicados por los organismos oficiales, no se tendrán en cuenta
              las sanciones o suspensiones asignadas después del final del
              torneo.
            </p>
            <p>
              LA PARTE EXTRAÑA DEL DÍA (1X2) Se refiere al par seleccionado que
              hace más goles durante el partido. El evento siempre es válido
              incluso si un jugador en esta selección no ha jugado el partido.
              El evento es válido no más tarde de la fecha de vencimiento
              generada por el sistema y se muestra en el cupón
            </p>
            <p>
              EL PAR EXTRAÑO Se refiere al par seleccionado que hace más goles
              durante la temporada. El evento se considerará nulo si uno de los
              jugadores presentes en la selección no realiza 15 presencias en la
              temporada de referencia.
            </p>
            <p>
              JUGADOR DÍA - GRUPO Se refiere al jugador que marca más goles en
              el día de referencia entre los presentes en la selección. Si uno o
              más jugadores anotan el mismo número de goles, la selección será
              considerada nula. El evento siempre es válido también si un
              jugador presente en la selección no juega el partido. El evento es
              válido no más tarde de la fecha de vencimiento generada por el
              sistema y se muestra en el cupón.
            </p>
            <p>
              GRUPO DE JUGADOR Se refiere al jugador que marca más goles en el
              día de referencia entre los presentes en la selección. Si uno o
              más jugadores anotan el mismo número de goles, la selección será
              considerada nula. El evento se considerará nulo si al menos el 50%
              de los jugadores presentes en la lista no totaliza 15 presencias
              al final de la temporada.
            </p>
            <p>
              GRUPO DE EQUIPO Se refiere al equipo que al final de la liga tiene
              una mejor posición respecto a otros presentes en la selección. Se
              considerará sólo el resultado publicado por las agencias
              oficiales, no se tomarán en cuenta las sanciones o suspensiones
              asignadas después del final del torneo.
            </p>
            <p>
              H / H Se refiere al equipo que al final de la liga tiene una mejor
              posición entre los dos propuestos. Si la selección se refiere a un
              torneo, se considerará ganar al equipo que obtendrá una mejor
              colocación, si ambos equipos son eliminados en la misma ronda la
              apuesta será considerada nula.
            </p>
            <p>
              PUNTOS PRIMERO 3 RONDA Se refiere al número total de puntos que
              los equipos presentes en la selección totalizarán en las 3
              primeras rondas.
            </p>
            <p>
              CAMPEONES DE CALIFICACIÓN Se refiere al equipo que califica o no
              en "Liga de Campeones"
            </p>
            <p>
              MEJOR EQUIPO DE DEFENSA TEMPORADA (EQUIPO QUE SUFRE MENOS GOLES)
              Se refiere al equipo que al final de temporada ha sufrido menos
              goles, si 2 equipos han sufrido el mismo número de goles que la
              apuesta será devuelta.
            </p>
            <p>
              MEJOR TEMPORADA DE EQUIPO DE ATAQUE (EQUIPO QUE MARCA MÁS GOLES)
              Se refiere al equipo que al final de temporada ha marcado más
              goles, si 2 equipos han anotado el mismo número de goles, la
              apuesta será devuelta.
            </p>
            <p>
              PEQUEÑO EQUIPO DE DEFENSA (EQUIPO QUE SUFRE MÁS GOLES) Se refiere
              al equipo que al final de temporada ha sufrido más goles, si 2
              equipos han sufrido el mismo número de goles la apuesta será
              devuelta
            </p>
            <p>
              PEQUEÑO EQUIPO DE ATAQUE (EQUIPO QUE PONGA MENOS GOLES) Se refiere
              al equipo que al final de temporada ha anotado más goles, si 2
              equipos han sufrido el mismo número de goles, la apuesta será
              devuelta.
            </p>
            <p>
              COACH THAT IS SACKED BEFORE THE END OF THE CHAMPIONSHIP Se refiere
              al entrenador que antes del final del campeonato es despedido,
              renuncia o por otras circunstancias debe abandonar el
              equipo.&nbsp;Se refiere al entrenador que antes del final del
              campeonato es despedido, renunció o por otras circunstancias debe
              dejar el equipo.
            </p>
            <p>
              KICKOFF Se refiere al equipo que gana el lanzamiento para el saque
              inicial.
            </p>
            <p>
              ACCIÓN PRIMER META DE TEMPORADA Se refiere a la forma en que se
              anotó el primer gol de la temporada, si otro gol se anota en el
              mismo minuto y de la misma manera las apuestas se devolverá.
            </p>
            <p>
              ÚLTIMA CLASIFICADA - SERIE A Se refiere al equipo que después de
              la temporada se clasifica por último.
            </p>
            <p>
              ACCIÓN PRIMER GOL DE DÍA Se refiere a la forma en que se anotó el
              primer gol del día, si otro gol se anota en el mismo minuto y de
              la misma manera las apuestas se devolverán.
            </p>
            <p>
              PROMOCIÓN Se refiere al equipo que al final de la temporada recibe
              promoción.
            </p>
            <p>
              TOTAL DE PUNTOS DEL EQUIPO: Se refiere al total de puntos que
              obtiene el equipo al final de la temporada.
            </p>
            <p>
              MINUTOS JUGADOS (1X2): Se refiere a aquellos que jugaron más
              minutos durante la competición, sólo se consideran 90 minutos
              regulares sin ningún tiempo de lesión de primera y segunda mitad.
              La apuesta se considera nula si uno de los 2 jugadores ha jugado
              menos de 10 minutos en el partido.
            </p>
            <p>
              MODO DE PRIMER GOL: Se refiere a la forma de realización del
              primer gol, teniendo en cuenta las actas efectivas y no la fecha
              del partido.
            </p>
            <p>
              PENALIDAD ESPECIAL: Tienes que predecir el equipo que marca /
              pierde una penalización. Para los propósitos de esta apuesta
              solamente 90 minutos regulares serán considerados.
            </p>
            <p>
              TARJETA ROJA ESPECIAL: Tienes que predecir si en un partido, habrá
              por lo menos una o ninguna expulsión. Para los propósitos de esta
              apuesta se tendrán en cuenta sólo los 90 minutos de juego
              regulalar. Los jugadores que no estén en el campo en el momento de
              recibir la tarjeta (por ejemplo, están en el banquillo) serán
              considerados irrelevantes. No se tendrán en cuenta las cartas que
              se muestran a los jugadores antes del inicio del partido o después
              del final del tiempo regular.
            </p>
            <p>
              ¿QUIÉN SERÁ DESPEDIDO PRIMERO ?: Tienes que predecir cuál de los
              dos entrenadores propuestos será despedido primero durante la
              temporada actual. En caso de que ninguno de ellos sea despedido,
              todas las apuestas relacionadas serán consideradas nulas.
            </p>
            <p>
              ¿QUÉ EQUIPO NO PERDERÁ UN PARTIDO ÚNICO ?: Tienes que predecir el
              equipo que al final de la temporada no sufrió pérdidas. El mercado
              se refiere sólo a los partidos de liga.
            </p>
            <p>
              ¿QUÉ ENTRENADOR NO DESCORARA EL CHAMPÁN ?: Tienes que predecir si
              el entrenador seleccionado será despedido en la fecha indicada.
            </p>
            <p>
              LEAGUE TOTALS Over/Under: Tienes que pronosticar si el número
              total de goles marcados en la ronda actual de un campeonato / taza
              específico será mayor o menor al número indicado. Para un evento
              nulo el resultado será considerado como 1-1. Si al menos 3
              partidos en la misma liga son nulos, todo el juego será
              considerado nulo.
            </p>
            <p>Tipos de apuestas disponibles en este mercado::</p>
            <ul>
              <li>
                Over: El número total de goles marcados en la ronda actual de un
                campeonato / taza específico será superior al número indicado
              </li>
              <li>
                Under: El número total de goles marcados en la ronda actual de
                un campeonato / taza específico será inferior al numero indicado
              </li>
            </ul>
            <p>
              Tiros a portería (Partido / Equipo /Jugador Seleccionado):
              Cualquier intento de gol intencional que:
            </p>
            <ul>
              <li>Entra en la red.</li>
              <li>
                Habría ido a la red si no hubiera sido detenido por una parada
                del portero.
              </li>
              <li>
                Habría ido a la red si no hubiera sido detenido por un defensor
                que es el último hombre.
              </li>
            </ul>
            <p>
              Los tiros que golpean el marco de la portería no se cuentan como
              tiros a puerta a menos que se cumplan los criterios anteriores.
            </p>
            <p>
              Los tiros bloqueados por otro jugador, que no es el último hombre,
              no se cuentan como tiros a puerta.
            </p>
            <p>
              Tiros (Partido / Equipo / Jugador seleccionado) - Un lanzamiento
              se define como cualquier intento de gol intencional que:
            </p>
            <ul>
              <li>Entra en la red.</li>
              <li>
                Habría entrado en la red de no haber sido por el portero o por
                un jugador contrario que es el último hombre.
              </li>
              <li>
                Se dirige hacia la portería y es bloqueado por un defensor,
                donde hay otros defensores o un portero detrás del bloqueador.
              </li>
              <li>
                Habría pasado por encima o fuera de la portería de no ser por la
                parada de un portero o por un jugador de campo.
              </li>
              <li>Alcanza el marco de la portería.</li>
              <li>
                Sobrepasa o se aleja de la portería sin hacer contacto con otro
                jugador.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet25"
            aria-controls="bet25"
            class="help__header--sub accordion-button collapsed"
          >
            Natacion
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet25"
            class="help__body accordion-collapse collapse"
          >
            <p>
              H/H: Tienes que pronosticar cuál de los dos nadadores / equipos
              enumerados será mejor colocado en la competición. En el caso de la
              misma colocación final entre los nadadores o equipos mencionados,
              todas las apuestas se considerarán nulas. Tipos de apuestas
              disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 HH: El primer nadador / equipo listado estará mejor ubicado
                que el segundo nadador / equipo listado
              </li>
              <li>
                2 HH: El segundo nadador / equipo listado estará mejor ubicado
                que el primer nadador / equipo listado
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet26"
            aria-controls="bet26"
            class="help__header--sub accordion-button collapsed"
          >
            Specials
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet26"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Ganador: Tienes que pronosticar si el competidor seleccionado será
              el ganador. Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>Ganador: El competidor seleccionado será el ganador.</li>
              <li>
                No Ganador: El competidor seleccionado no será el ganador.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet27"
            aria-controls="bet27"
            class="help__header--sub accordion-button collapsed"
          >
            Tenis
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet27"
            class="help__body accordion-collapse collapse"
          >
            <p>2Way: Tienes que predecir el ganador del partido.</p>
            <p>
              1st Set: Tienes que predecir quién ganará el primer set. Si un
              jugador se retira durante el primer set, las apuestas serán
              anuladas. Durante los sets siguientes, si un jugador se jubila
              esto no tendrá influencia en el resultado de las apuestas.
            </p>
            <p>
              Handicap Games: Todos los juegos ganados por un solo jugador
              durante el partido se suman, independientemente del número de sets
              ganados. El resultado de la apuesta se obtiene sumando o restando
              el número de juegos dados como handicap al jugador indicado. El
              desempate tiene valor de un juego.
            </p>
            <p>
              Handicap Sets: El resultado de la apuesta se obtiene sumando o
              restando del handicap del jugador referente al resultado final del
              partido
            </p>
            <p>
              Set Betting: Tienes que predecir el resultado exacto del partido,
              teniendo en cuenta el número de sets ganados por cada jugador de
              tenis.
            </p>
            <p>
              Sets Won By Player: Tienes que predecir cuántos sets serán ganados
              por los jugadores durante el partido.
            </p>
            <p>
              Over/Under Games: Tienes que predecir si el número total de
              partidos jugados durante el partido será mayor o menor que el
              número indicado. Se especifica que el tiebreak y el super tiebreak
              tienen el valor de un juego más allá de su resultado numérico.
            </p>
            <p>
              Odd/Even: Tienes que predecir si el número total de juegos,
              jugados en un partido, será par o impar. Se especifica que el
              tiebreak y el super tiebreak tienen el valor de un juego más allá
              de su resultado numérico.
            </p>
            <p>2nd Set: Tienes que predecir el ganador del 2do Set.</p>
            <p>
              1X2 1&amp;2 Set: Tienes que predecir el resultado de los dos
              primeros sets del partido, en caso de retirada de uno de los dos
              jugadores antes del final de dos sets, la apuesta será declarada
              nula.
            </p>
            <p>
              Combo: Tienes que predecir el resultado del partido 1 o 2
              simultáneamente a los juegos de sobre / bajo ofrecidos, en caso de
              retirada de uno de los dos jugadores antes de la conclusión del
              partido, laapuesta será nula.
            </p>
            <p>
              P1 Win 1Set: Tienes que predecir que el primer jugador ganará al
              menos un set durante el partido, en caso de retirada de uno de los
              dos jugadores antes de la conclusión de al menos un conjunto de la
              apuesta será nulo; Si la retirada se produce después de la
              conclusión del primer set, la apuesta se pagará regularmente.
            </p>
            <p>
              P2 Win 1Set: Tienes que predecir que el segundo jugador ganará al
              menos un set durante el partido; En caso de retirada de uno de los
              dos jugadores antes de la conclusión de al menos un conjunto de la
              apuesta será nula, Si la retirada se produce después de la
              conclusión del primer set, la apuesta se pagará regularmente.
            </p>
            <p>
              P1 Tot. Set: Tienes que predecir el número exacto de sets ganados
              por el primer jugador, en caso de retirada de uno de los dos
              jugadores antes de la conclusión del partido, la apuesta será
              nula.
            </p>
            <p>
              P2 Tot. Set: Tienes que predecir el número exacto de sets ganados
              por el segundo jugador, en caso de retirada de uno de los dos
              jugadores antes de la conclusión del partido, la apuesta será
              nula.
            </p>
            <p>
              Total Set: Tienes que predecir el número total de juegos jugados;
              En caso de retirada de uno de los dos jugadores antes de la
              conclusión del partido, la apuesta será nula.
            </p>
            <p>Tennis Special</p>
            <p>
              Head To Head ACE: Tienes que predecir cuál de los dos jugadores
              marcará más ases durante el torneo, en caso de que los jugadores
              hayan anotado el mismo número de ases, la apuesta será declarada
              nula. En caso de que un jugador no participe en el torneo la
              apuesta es declarada nula. Para determinar el resultado, se
              considerará la página web oficial del concurso.
            </p>
            <p>
              Head To Head Overall: Tienes que predecir cuál de los dos
              jugadores especificados alcanzará la mejorcolocación al final de
              la competencia relativa. Si dos jugadores tienen la misma
              colocación en el torneo, la diferencia establecida se utilizará
              para determinar el ganador. Si dos jugadores tienen lamisma
              diferencia, la apuesta será nula.
            </p>
            <p>
              Finalist name/Reaching the Final/Passes Elimination Phase: Para
              ganar esta apuesta tienes que predecir quién entre los jugadores
              de tenis de vez en cuando se propondrá, estará en el jugador de
              tenis final que llegará al último jugador de tenis que pasará las
              eliminatorias en cada torneo listado en el torneo. Se especifica
              que, si un jugador no participa en la competición, las apuestas
              relacionadas serán nulas.
            </p>
            <p>
              Tie Break 1st SET: Tienes que predecir si el primer set terminará
              con un desempate. En caso de que el primer set no se complete,
              todas las apuestas serán anuladas.
            </p>
            <p>
              Tie Break Match: Tienes que predecir si durante la reunión al
              menos un set terminará con un desempate. Si el partido no se
              completa, todas las apuestas serán anuladas, a menos que se haya
              jugado un desempate. En caso de que las reglas de una competición
              no contemplen un desempate para el quinto set, sólo se
              considerarán los primeros 4 sets del partido.
            </p>
            <p>
              Quarter (Of The Board) Of The Winner: Tienes que predecir a qué
              cuarto del tablero pertenece el ganador del torneo (1er, 2º, 3º o
              4º). En caso de que el torneo se interrumpa y no se complete,
              todas las apuestas serán anuladas.
            </p>
            <p>
              Part Of The Board Of The Winner: Tienes que predecir a qué mitad
              del tablero pertenece el ganador del torneo (alto, bajo). En caso
              de que el torneo se interrumpa y no se complete, todas las
              apuestas serán anuladas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet28"
            aria-controls="bet28"
            class="help__header--sub accordion-button collapsed"
          >
            Voleibol
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet28"
            class="help__body accordion-collapse collapse"
          >
            <p>1st Set: Tienes que predecir el ganador del primer set.</p>
            <p>
              Even/Odd: Tienes que predecir si el número total de puntos
              anotados en un juego es par o impar.
            </p>
            <p>
              Set Betting: Tienes que predecir el resultado exacto del partido
              en términos de número de sets ganados por cada equipo.
            </p>
            <p>
              HH (Head to Head): Tienes que predecir el ganador del partido.
            </p>
            <p>
              Handicap 1-2: El resultado de una apuesta con un handicap se
              obtiene sumando o restando el handicap al resultado del partido
              considerando el resultado en sets.
            </p>
            <p>
              Total Sets: Tienes que predecir el número total de sets jugados
              durante el partido.
            </p>
            <p>
              Total Points: Tienes que predecir si el número total de puntos
              anotados será más o menos que el número indicado.
            </p>
            <p>
              HH Scorer: Tienes que predecir cuál de los dos jugadores marcará
              el mayor número de puntos en su liga o partido de copa. Si ambos
              anotan el mismo número de puntos, o si uno de ellos no marca en
              absoluto, todas las apuestas serán nulas.
            </p>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet29"
            aria-controls="bet29"
            class="help__header--sub accordion-button collapsed"
          >
            Waterpolo
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet29"
            class="help__body accordion-collapse collapse"
          >
            <p>
              Handicap: El resultado de la apuesta con handicap se obtiene
              sumando o restando el handicap al resultado final del partido. El
              valor de handicap se refiere siempre al equipo local. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                1 H: El equipo local anotará más goles que el equipo visitante
                (considerando el handicap).
              </li>
              <li>
                2 H: El equipo visitante marcará más goles que el equipo local
                (considerando el handicap).
              </li>
            </ul>
            <p>
              1X2: Tienes que pronosticar al ganador del partido. Tipos de
              apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>1:El equipo de casa ganará el partido</li>
              <li>X: El resultado será empate</li>
              <li>2:El equipo huésped ganará el partido</li>
            </ul>
            <p>
              DC: Hay que pronosticar el ganador del partido eligiendo una de
              las opciones disponibles Tipos de apuestas disponibles en este
              mercado:
            </p>
            <ul>
              <li>
                1XDC:El equipo de casa ganará el partido o el resultado será
                empate
              </li>
              <li>
                12DC: El equipo de casa o el equipo de fueraganará el partido
              </li>
              <li>
                X2DC:El equipo de fuera ganará el partido o el resultado será
                empate
              </li>
            </ul>
            <p>
              Más/Menos: Tienes que predecir si el número total de puntos
              anotados durante el partido será más o menos el número indicado.
              Tipos de apuestas disponibles en este mercado:
            </p>
            <ul>
              <li>
                Más: El número total de puntos anotados durante el partido será
                superior al número indicado.
              </li>
              <li>
                Menos: El número total de puntos anotados durante el partido
                estará debajo del número indicado.
              </li>
            </ul>
          </div>
          <div
            data-bs-toggle="collapse"
            data-bs-target="#bet30"
            aria-controls="bet30"
            class="help__header--sub accordion-button collapsed"
          >
            Deportes de Invierno
          </div>
          <div
            data-bs-parent="#accordion-help-sub2-1"
            id="bet30"
            class="help__body accordion-collapse collapse"
          >
            <p>H/H: Tipos de apuestas disponibles en este mercado:</p>
            <ul>
              <li>
                1 HH: El primer competidor listado estará mejor ubicado en el
                evento general.
              </li>
              <li>
                2 HH: El segundo competidor listado estará mejor ubicado en el
                evento general
              </li>
            </ul>
          </div>
        </div>
      {/if}
    </div>
  </section>
</div>

<style>
  .help {
    display: grid;
    margin: 0.5rem 1rem;
    grid-template-columns: calc(30% - 0.25rem) calc(70% - 0.25rem);
    gap: 0.5rem;
    height: 80vh;
  }
  .help__body,
  .help__body--sub {
    max-height: 72vh;
    overflow-x: auto;
    padding: 0.5rem;
    background: #333638;
  }

  .help__header,
  .help__header--title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: hsl(213deg, 9%, 23%);
    font-size: 1rem;
    padding: 0.5rem;
    height: 2rem;
    border-bottom: 1px solid #242424;
  }
  .help__header.active,
  .help__header--sub.active {
    background-color: #f54b00;
  }
  .help__header--sub {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333638;
    color: var(--color-text);
    height: 2rem;
    padding: 0.5rem;
    font-size: 0.85rem;
    border-bottom: 1px solid #2a2a2a;
  }
  .help__body--sub .help__body {
    max-height: 100%;
    overflow: hidden;
    background-color: #414242;
  }
  .help__header--sub {
    background-color: #282b2d;
  }
  @media only screen and (max-width: 1022px) {
    .help {
      display: flex;
      margin: 0.5rem 1rem;
      gap: 0.5rem;
      flex-direction: column;
      height: 100%;
    }
  }
</style>
