import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import Button from "../components/buttons";
import Concard from "../components/Concard";

export default function TermsCond() {
  const navigate = useNavigate();

  const termsContent = `1. Acceptance of Terms

By accessing or using the Productivity List system, users agree to comply with and be bound by these Terms and Conditions. If a user does not agree with any part of these terms, they should not use the system.

2. Purpose of the System

The Productivity List system is intended to assist users in organizing tasks, managing priorities, and tracking productivity. It is provided as a productivity aid and does not guarantee specific outcomes or results.

3. User Responsibilities

Users agree to:

- Provide accurate and appropriate information when creating tasks or accounts.
- Use the system for lawful and intended purposes only.
- Maintain the confidentiality of their login credentials (if applicable).
- Avoid misuse, unauthorized access, or activities that may disrupt system functionality.

4. Admin Rights and Responsibilities

The Admin reserves the right to:

- Manage user accounts, roles, and permissions.
- Modify or remove tasks, categories, or content that violate system policies.
- Update system settings, features, or configurations as needed.
- Monitor system usage to ensure proper functioning and security.

5. Data Usage and Privacy

User data (tasks, notes, and preferences) is stored solely for system functionality.

The system will take reasonable measures to protect user data from unauthorized access.

Users are responsible for the content they store within the system.

6. System Availability

The Productivity List system aims to be available at all times; however, access may be temporarily unavailable due to maintenance, updates, or technical issues. The system is not liable for any loss resulting from downtime or data unavailability.

7. Limitations of Liability

The system is provided "as is" without warranties of any kind. The developers or administrators are not responsible for productivity loss, missed deadlines, or damages resulting from the use or inability to use the system.

8. Modifications to Terms

The Admin reserves the right to modify these Terms and Conditions at any time. Continued use of the system after changes indicates acceptance of the updated terms.

9. Termination of Access

Access to the system may be suspended or terminated if a user violates these Terms and Conditions or engages in behavior that compromises system security or integrity.

10. Governing Rules

These Terms and Conditions are governed by applicable institutional or organizational policies under which the Productivity List system is deployed.`;

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4 pb-4">
      {/* Logo - smaller */}
      <img
        src={logomain}
        alt="Logo"
        className="w-32 sm:w-40 h-32 sm:h-40 mt-16 sm:mt-16"
      />

      {/* White background rounded container */}
      <Concard>
        <h4 className="text-black text-2xl sm:text-3xl font-indie font-bold text-center">
          Terms and Conditions
        </h4>

        {/* Terms Content */}
        <div className="bg-primary rounded-xl p-3 sm:p-4 w-full h-99 sm:h-80 overflow-y-auto">
          <p className="text-black font-indie text-xs sm:text-sm leading-relaxed text-center whitespace-pre-line">
            {termsContent}
          </p>
        </div>

        {/* Accept Button */}
        <Button
          type="button"
          size="md"
          variant="primary"
          onClick={() => navigate("/createaccount")}
        >
          Accept
        </Button>
      </Concard>
    </div>
  );
}
