import hashlib
import os
import pickle
import random
import subprocess
import sqlite3
import xml.etree.ElementTree as ET

# --- Vulnerabilities ---

# Hardcoded credentials (python:S2068)
PASSWORD = "SuperSecret123!"
API_KEY = "AKIAIOSFODNN7EXAMPLE"


def run_command(user_input):
    # OS command injection (python:S4721)
    return subprocess.call("ls " + user_input, shell=True)


def get_user(db_path, username):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    # SQL injection via string concatenation (python:S3649)
    query = "SELECT * FROM users WHERE name = '" + username + "'"
    cursor.execute(query)
    return cursor.fetchall()


def hash_password(password):
    # Weak/insecure hash algorithm used for sensitive data (python:S4790)
    return hashlib.md5(password.encode()).hexdigest()


def weak_random_token():
    # Use of a non-cryptographic PRNG for a security-sensitive value (python:S2245)
    return random.random()


def load_data(serialized_blob):
    # Deserialization of untrusted data (python:S5042)
    return pickle.loads(serialized_blob)


def parse_xml(xml_string):
    # XXE-vulnerable XML parsing (python:S2755)
    root = ET.fromstring(xml_string)
    return root


def debug_endpoint():
    # Enabling debug mode in a "production" looking app (python:S4507-style smell)
    app_debug = True
    return app_debug


# --- Bugs ---

def divide(a, b):
    # Potential division by zero, and unreachable code below (python:S1763 / S3518)
    result = a / b
    return result
    print("This line is unreachable")


def get_first_item(items):
    # Possible IndexError never guarded against (python:S5754-style bug)
    return items[0]


def compare_values(a, b):
    # Suspicious equality: comparing different types / always-true condition (python:S1764)
    if a == a:
        return True
    return False


def append_to_list(item, target=[]):
    # Mutable default argument (python:S5717)
    target.append(item)
    return target


def close_file_badly(path):
    # Resource leak: file never closed (python:S2093)
    f = open(path, "r")
    data = f.read()
    return data


def unused_variable_bug():
    total = 0
    unused = 42  # Unused local variable (python:S1481)
    for i in range(10):
        total += i
    return total


class Base:
    def do_work(self):
        raise NotImplementedError


class Derived(Base):
    def do_work(self):
        pass

    def do_work(self):
        # Duplicate method name, second definition silently overrides the first (python:S1144 / bug)
        return "duplicate"


# --- Code Smells ---

def long_parameter_list(a, b, c, d, e, f, g, h):
    # Too many parameters (python:S107)
    return a + b + c + d + e + f + g + h


def complex_function(x):
    # Excessive cognitive complexity (python:S3776)
    if x > 0:
        if x > 10:
            if x > 20:
                if x > 30:
                    if x > 40:
                        if x > 50:
                            return "very large"
                        else:
                            return "large"
                    else:
                        return "medium-large"
                else:
                    return "medium"
            else:
                return "small-medium"
        else:
            return "small"
    else:
        if x < -10:
            return "very negative"
        else:
            return "negative"


def duplicated_logic_a(values):
    # Duplicated code block (python:S4144)
    total = 0
    for v in values:
        if v % 2 == 0:
            total += v
    return total


def duplicated_logic_b(values):
    # Same logic duplicated from duplicated_logic_a (python:S4144)
    total = 0
    for v in values:
        if v % 2 == 0:
            total += v
    return total


def empty_except_block():
    try:
        risky = 1 / 0
    except Exception:
        # Empty catch block swallows the error (python:S108 / S5754)
        pass


def magic_numbers(order_total):
    # Magic numbers with no explanation (python:S109)
    if order_total > 8675309:
        return order_total * 0.42
    return order_total


class god_class:
    # Non-PEP8 class name (python:S101), and class doing far too much (python:S1448)
    def step_one(self):
        pass

    def step_two(self):
        pass

    def step_three(self):
        pass

    def step_four(self):
        pass

    def step_five(self):
        pass

    def step_six(self):
        pass

    def step_seven(self):
        pass

    def step_eight(self):
        pass

    def step_nine(self):
        pass

    def step_ten(self):
        pass

    def step_eleven(self):
        pass

    def step_twelve(self):
        pass

    def step_thirteen(self):
        pass

    def step_fourteen(self):
        pass

    def step_fifteen(self):
        pass

    def step_sixteen(self):
        pass

    def step_seventeen(self):
        pass

    def step_eighteen(self):
        pass

    def step_nineteen(self):
        pass

    def step_twenty(self):
        pass

    def step_twenty_one(self):
        pass


def commented_out_code():
    total = 0
    # for i in range(100):
    #     total += i * 2
    #     print(total)
    total += 1
    return total


# TODO: refactor this whole module, it was written in a hurry (python:S1135)
def todo_marker():
    return None


if __name__ == "__main__":
    print(hash_password(PASSWORD))
    print(divide(10, 0))
